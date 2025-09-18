import feedparser
import sqlite3
from datetime import datetime
import time
import schedule
from models import init_db

# Example RSS feeds (you can add more later)
FEEDS = [
    "http://feeds.bbci.co.uk/news/world/rss.xml",
    "https://feeds.reuters.com/reuters/worldNews"
]

def fetch_and_store():
    print("🔄 Fetching news feeds...")
    conn = sqlite3.connect("gcaiphase1.db")
    c = conn.cursor()

    for url in FEEDS:
        feed = feedparser.parse(url)
        for entry in feed.entries[:5]:  # latest 5 from each feed
            # Avoid duplicates
            c.execute("SELECT * FROM news WHERE headline=?", (entry.title,))
            if not c.fetchone():
                c.execute(
                    "INSERT INTO news (headline, source, timestamp, category, bias) VALUES (?, ?, ?, ?, ?)",
                    (entry.title, entry.link, datetime.now().strftime("%Y-%m-%d %H:%M"), None, None)
                )
                print(f"✅ Stored: {entry.title}")

    conn.commit()
    conn.close()
    print("✔ Fetch complete.\n")

if __name__ == "__main__":
    init_db()

    # Run once at start
    fetch_and_store()

    # Schedule every 10 minutes
    schedule.every(10).minutes.do(fetch_and_store)

    print("🕒 Collector running... will fetch every 10 minutes.\n")

    while True:
        schedule.run_pending()
        time.sleep(1)
