import sqlite3

def init_db():
    conn = sqlite3.connect("gcaiphase1.db")
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS news (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    headline TEXT,
                    source TEXT,
                    timestamp TEXT,
                    category TEXT,
                    bias TEXT
                )''')
    conn.commit()
    conn.close()
