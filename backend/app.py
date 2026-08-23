"""
Flask backend using Postgres instead of SQLite.
Requires a running Postgres server and a DATABASE_URL env var, e.g.:

  export DATABASE_URL="postgresql://user:password@localhost:5432/gei"

Run with: python app.py
Server starts on http://localhost:5000
"""
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2 # lets you run SQL queries in postgres
from psycopg2.extras import RealDictCursor

app = Flask(__name__)


# In production, set FRONTEND_URL to your deployed frontend's origin
# (e.g. https://your-domain.com) to restrict CORS to just that site.
# Left unset, this allows any origin -- fine for local dev, not for prod.
CORS(app, origins=os.environ.get("FRONTEND_URL", "*")) # ME: this is set in Render tool. So if Render runs the app, it will use that URL.
DATABASE_URL = os.environ["DATABASE_URL"]  # fails loudly if not set

def get_db():
    # RealDictCursor makes rows come back as dicts, like sqlite3.Row did
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)

def init_db():
    conn = get_db()
    conn.cursor().execute(
        """
        CREATE TABLE IF NOT EXISTS gei (
            id SERIAL PRIMARY KEY, 
            text TEXT NOT NULL,
            done BOOLEAN NOT NULL DEFAULT FALSE
        )
        """
    )
    conn.commit()
    conn.close()

@app.route("/api/gei", methods=["GET"])
def list_gei():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM gei ORDER BY id DESC")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route("/api/gei", methods=["POST"])
def create_item():
    data = request.get_json(force=True)
    text = (data.get("text") or "").strip()
    if not text:
        return jsonify({"error": "text is required"}), 400

    conn = get_db()
    cur = conn.cursor()
    # %s placeholders instead of sqlite's ? -- main syntax difference from SQLite
    cur.execute("INSERT INTO gei (text, done) VALUES (%s, FALSE) RETURNING *", (text,))
    row = cur.fetchone()
    conn.commit()
    conn.close()
    return jsonify(row), 201

@app.route("/api/gei/<int:item_id>", methods=["PATCH"])
def update_item(item_id):
    data = request.get_json(force=True)
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM gei WHERE id = %s", (item_id,))
    row = cur.fetchone()
    if row is None:
        conn.close()
        return jsonify({"error": "not found"}), 404

    done = data.get("done", row["done"])
    text = data.get("text", row["text"])
    cur.execute(
        "UPDATE gei SET text = %s, done = %s WHERE id = %s RETURNING *",
        (text, bool(done), item_id),
    )
    updated = cur.fetchone()
    conn.commit()
    conn.close()
    return jsonify(updated)

@app.route("/api/gei/<int:item_id>", methods=["DELETE"])
def delete_by_id(item_id):
    conn = get_db()
    conn.cursor().execute("DELETE FROM gei WHERE id = %s", (item_id,))
    conn.commit()
    conn.close()
    return "", 204

@app.route("/msg", methods=["GET"])
def toClient():
    message = "Hello, Earth"
    jsonify(message)
    return jsonify({ "message": f"{message}" })

@app.route("/dropdown/<string:incData>", methods=["PUT"])
def fromClient(incData):
    data = incData
    print(data)
    return jsonify({ "message": f"server received: {incData}" })

@app.route("/about")
def about():
    return

init_db()
if __name__ == "__main__":
    app.run(debug=True, port=5000)
