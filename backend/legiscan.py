import requests
import os
from dotenv import load_dotenv
import re
from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2 # lets you run SQL queries in postgres
from psycopg2.extras import RealDictCursor

api = Flask(__name__)
load_dotenv()
LEGISCAN_API_KEY = os.getenv("LEGISCAN_API_KEY")
LEGISCAN_BASE_URL= f"https://api.legiscan.com/?key={KEY}&op={OP}&state={STATE}"



# this connects init
@api.route("/api/legiscan/nothere", methods=["GET"])
def api_connect(parameter="none"):
    response = requests.get(LEGISCAN_BASE_URL)
    if response.status_code == 200:
        resp = response.json()
        print("status code 200, true")
    return jsonify({"operations": {operations}})


@api.route("/api/legiscan/submit", methods=["GET"])
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
    return
    
@api.route("/api/legiscan", methods=["GET"])
def legiscan_proxy():
    op = request.args.get("op")
    if not op:
        return jsonify({"error": "op is required"}), 400

    # Forward any other query params the frontend sent (state, id, etc.)
    # straight through, and add the real key server-side.
    params = request.args.to_dict()
    params["key"] = LEGISCAN_API_KEY

    response = requests.get(LEGISCAN_BASE_URL, params=params)
    return jsonify(response.json()), response.status_code

# splits an API identifier operation and returns an "identifier". 
# ** API identifier operations are formatted like "getIdentifierName" **
def get_identifier(api_operation="get"):
    split_string = re.split(r'(?=[A-Z])', api_operation)
    split_string.remove("get")
    identifier = " ".join(split_string)
    #print(f"{split_string} = {identifier_str}")
    return identifier
# returns an identifier operation that matches "identifier_choice"

def get_operation(identifier_choice=""):
    for op in operations:
        identifier = get_identifier(op)
        if identifier == identifier_choice:
            return op
    return



api_connect()

operations = [
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
"setMonitor", 
]

