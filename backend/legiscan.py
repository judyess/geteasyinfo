import requests
import os
from dotenv import load_dotenv
import re
from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2 # lets you run SQL queries in postgres
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
load_dotenv()
CORS(app, origins=os.environ.get("FRONTEND_URL", "*"))
DATABASE_URL = os.environ["DATABASE_URL"] 
LEGISCAN_API_KEY = os.getenv("LEGISCAN_API_KEY")
LEGISCAN_BASE_URL= f"https://api.legiscan.com/"

def get_db():
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
def init_db():
    conn = get_db()
    conn.close()

@app.route("/api/legiscan", methods=["GET"])
def legiscan_proxy():
    op = request.args.get("op")
    if not op:
        return jsonify({"error": "op is required"}), 400

    # Forward any other query params the frontend sent (state, id, etc.)
    # straight through, and add the real key server-side.
    params = request.args.to_dict()
    params["key"] = LEGISCAN_API_KEY

    response = requests.get(LEGISCAN_BASE_URL, params=params)
    return (jsonify(response.json()), response.status_code)
    
# this connects init
@app.route("/api/legiscan/nothere", methods=["GET"]) # called at module level. what does that mean?
def api_connect(parameter="none"):
    response = requests.get(LEGISCAN_BASE_URL)
    if response.status_code == 200:
        res = response.json()
        print("status code 200, true")
    return jsonify({"msg": "legi-hi"})

@app.route("/api/legiscan/submit", methods=["GET"])
def get_param(parameter="none"):
    response = requests.get(LEGISCAN_BASE_URL)
    if response.status_code == 200:
        resp = response.json()
        print("status code 200, true")

        if resp.get("status") == "OK":
            data = resp.get(parameter, {})
            print("resp.get status OK: true")
            print(f"OUTPUT: {data}")
        else:
            print("API Error:", resp.get("message", "Unknown error"))
    else:
        print(f"HTTP Request failed with status code: {response.status_code}")
    return jsonify({ "message": f"Legiscan server received: {parameter}" })


@app.route("/search/state/<string:incData>", methods=["PUT"])
def getState(incData):
    data = incData
    print(data)
    return jsonify({ "message": f"Legiscan server received: {incData}" })

@app.route("/search/op/<string:incData>", methods=["PUT"])
def getOps(incData):
    data = incData
    print(data)
    return jsonify({ "message": f"Legiscan server received: {incData}" })

api_connect()
if __name__ == "__main__":
    app.run(debug=True, port=5000)

api_ops = [
"getSessionList",
"getMasterList", 
"getMasterListRaw", 
"getBill", 
"getBillText", 
"getAmendment",
"getSupplement",
"getRollCall", 
"getPerson", 
"getSearch", 
"getSearchRaw", 
"getDatasetList", 
"getDataset",
"getDatasetRaw",
"getSessionPeople", 
"getSponsoredList",
"getMonitorList", 
"getMonitorListRaw",
"getMonitor", 
]

opsList = {
  "1": "getSessionList",
  "2": "getMasterList",
  "3": "getMasterListRaw",
  "4": "getBill",
  "5": "getBillText",
  "6": "getAmendment",
  "7": "getSupplement",
  "8": "getRollCall",
  "9": "getPerson",
  "10": "getSearch",
  "11": "getSearchRaw",
  "12": "getDatasetList",
  "13": "getDataset",
  "14": "getDatasetRaw",
  "15": "getSessionPeople",
  "16": "getSponsoredList",
  "17": "getMonitorList",
  "18": "getMonitorListRaw",
  "19": "setMonitor"
}