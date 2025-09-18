from flask import Flask, render_template, request, redirect
import sqlite3
from models import init_db

app = Flask(__name__)

def get_news():
    conn = sqlite3.connect("gcaiphase1.db")
    c = conn.cursor()
    c.execute("SELECT id, headline, source, timestamp, category, bias FROM news ORDER BY id DESC")
    data = c.fetchall()
    conn.close()
    return data

@app.route("/")
def dashboard():
    data = get_news()
    return render_template("dashboard.html", news=data)

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

if __name__ == "__main__":
    init_db()
    app.run(debug=True, host="0.0.0.0", port=5000)
