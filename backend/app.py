"""
Flask backend using Postgres instead of SQLite.
Requires a running Postgres server and a DATABASE_URL env var, e.g.:

  export DATABASE_URL="postgresql://user:password@localhost:5432/tododb"

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

print(DATABASE_URL)
def get_db():
    # RealDictCursor makes rows come back as dicts, like sqlite3.Row did
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)

def init_db():
    conn = get_db()
    conn.cursor().execute(
        """
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY, 
            text TEXT NOT NULL,
            done BOOLEAN NOT NULL DEFAULT FALSE
        )
        """
    )
    conn.commit()
    conn.close()

@app.route("/api/todos", methods=["GET"])
def list_todos():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM todos ORDER BY id DESC")
    rows = cur.fetchall()
    conn.close()
    return jsonify(rows)

@app.route("/api/todos", methods=["POST"])
def create_todo():
    data = request.get_json(force=True)
    text = (data.get("text") or "").strip()
    if not text:
        return jsonify({"error": "text is required"}), 400

    conn = get_db()
    cur = conn.cursor()
    # %s placeholders instead of sqlite's ? -- main syntax difference from SQLite
    cur.execute("INSERT INTO todos (text, done) VALUES (%s, FALSE) RETURNING *", (text,))
    row = cur.fetchone()
    conn.commit()
    conn.close()
    return jsonify(row), 201

@app.route("/api/todos/<int:todo_id>", methods=["PATCH"])
def update_todo(todo_id):
    data = request.get_json(force=True)
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM todos WHERE id = %s", (todo_id,))
    row = cur.fetchone()
    if row is None:
        conn.close()
        return jsonify({"error": "not found"}), 404

    done = data.get("done", row["done"])
    text = data.get("text", row["text"])
    cur.execute(
        "UPDATE todos SET text = %s, done = %s WHERE id = %s RETURNING *",
        (text, bool(done), todo_id),
    )
    updated = cur.fetchone()
    conn.commit()
    conn.close()
    return jsonify(updated)

@app.route("/api/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    conn = get_db()
    conn.cursor().execute("DELETE FROM todos WHERE id = %s", (todo_id,))
    conn.commit()
    conn.close()
    return "", 204

@app.route("/do", methods=["POST"])
def dosomething():
    data = request.get_json(force=True)
    conn = get_db()
    conn.close()
    return jsonify({"message": "messaged received"}) # message changed to string from var

@app.route("/dropdown", methods=["POST"])
def receive_dropdown_option():
    data = request.get_json(force=True)
    return jsonify(data)


init_db()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
