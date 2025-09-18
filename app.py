from flask import Flask, render_template, request, redirect
import sqlite3
import threading
import time
import schedule
import feedparser
from datetime import datetime, date
from models import init_db

app = Flask(__name__)

# ---------- Real News Feeds + Auto Categories ----------
FEEDS = {
    "http://feeds.bbci.co.uk/news/world/rss.xml": "Conflict",
    "https://feeds.reuters.com/reuters/worldNews": "Conflict",
    "http://rss.cnn.com/rss/edition_world.rss": "Conflict",
    "https://www.aljazeera.com/xml/rss/all.xml": "Conflict",
    "http://feeds.bbci.co.uk/news/business/rss.xml": "Economy",
    "https://feeds.reuters.com/reuters/businessNews": "Economy",
    "http://feeds.bbci.co.uk/news/technology/rss.xml": "Technology",
    "https://feeds.arstechnica.com/arstechnica/index/": "Technology",
    "https://www.theguardian.com/environment/rss": "Environment",
    "https://rss.nytimes.com/services/xml/rss/nyt/Climate.xml": "Environment"
}

# ---------- Collector ----------
def fetch_and_store():
    print("🚀 Running fetch at", datetime.now().strftime("%H:%M:%S"))
    try:
        conn = sqlite3.connect("gcaiphase1.db", timeout=10, check_same_thread=False)
        c = conn.cursor()

        for url, default_category in FEEDS.items():
            feed = feedparser.parse(url)
            print(f"📡 {url} returned {len(feed.entries)} entries")

            for entry in feed.entries[:5]:
                c.execute("SELECT * FROM news WHERE source=?", (entry.link,))
                if not c.fetchone():
                    c.execute(
                        "INSERT INTO news (headline, source, timestamp, category, bias) VALUES (?, ?, ?, ?, ?)",
                        (
                            entry.title,
                            entry.link,
                            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                            default_category,
                            None
                        )
                    )
                    print(f"✅ Saved: {entry.title} [{default_category}]")
                else:
                    print(f"⏩ Skipped (already in DB): {entry.title}")

        conn.commit()
        conn.close()
        print("✔ Fetch complete.\n")

    except Exception as e:
        print("❌ Error during fetch:", e)

def run_scheduler():
    print("🕒 Scheduler started...")
    schedule.every(10).minutes.do(fetch_and_store)
    while True:
        schedule.run_pending()
        time.sleep(10)

# ---------- DB ----------
def get_news(limit=10, offset=0, filter_date=None):
    conn = sqlite3.connect("gcaiphase1.db")
    c = conn.cursor()

    if filter_date:
        c.execute("SELECT COUNT(*) FROM news WHERE date(timestamp)=?", (filter_date,))
        total = c.fetchone()[0]
        c.execute(
            "SELECT id, headline, source, timestamp, category, bias FROM news WHERE date(timestamp)=? ORDER BY id DESC LIMIT ? OFFSET ?",
            (filter_date, limit, offset)
        )
    else:
        c.execute("SELECT COUNT(*) FROM news")
        total = c.fetchone()[0]
        c.execute(
            "SELECT id, headline, source, timestamp, category, bias FROM news ORDER BY id DESC LIMIT ? OFFSET ?",
            (limit, offset)
        )

    data = c.fetchall()

    # ✅ Fetch distinct dates for dropdown
    c = conn.cursor()
    c.execute("SELECT DISTINCT date(timestamp) FROM news ORDER BY date(timestamp) DESC")
    available_dates = [row[0] for row in c.fetchall()]

    conn.close()
    return data, total, available_dates

# ---------- Flask ----------
@app.route("/")
@app.route("/page/<int:page>")
def dashboard(page=1):
    per_page = 10
    offset = (page - 1) * per_page

    filter_date = request.args.get("date")
    if not filter_date:
        filter_date = date.today().strftime("%Y-%m-%d")

    news, total, available_dates = get_news(limit=per_page, offset=offset, filter_date=filter_date)
    total_pages = (total // per_page) + (1 if total % per_page else 0)

    return render_template(
        "dashboard.html",
        news=news,
        page=page,
        total_pages=total_pages,
        selected_date=filter_date,
        available_dates=available_dates
    )

@app.route("/classify/<int:news_id>", methods=["POST"])
def classify(news_id):
    category = request.form.get("category")
    bias = request.form.get("bias")
    conn = sqlite3.connect("gcaiphase1.db")
    c = conn.cursor()
    c.execute("UPDATE news SET category=?, bias=? WHERE id=?", (category, bias, news_id))
    conn.commit()
    conn.close()
    return redirect("/")

@app.route("/refresh")
def refresh():
    fetch_and_store()
    return redirect("/")

if __name__ == "__main__":
    init_db()
    fetch_and_store()
    threading.Thread(target=run_scheduler, daemon=True).start()
    app.run(host="0.0.0.0", port=5000)
