import requests
import os
from dotenv import load_dotenv
import re
import myLists
load_dotenv()
API_KEY = os.getenv("LEGISCAN_API_KEY")

STATE="NC"
PARAMETER="sessions"
OPERATION="getSessionList"
ID_CHOICE=""

#BASE_URL= f"https://api.legiscan.com/?key={API_KEY}&op={OPERATION}&state={STATE}"



# splits an API identifier operation and returns an "identifier". 
# ** API identifier operations are formatted like "getIdentifier" **
def get_identifier(api_operation="get"):
    split_string = re.split(r'(?=[A-Z])', api_operation)
    split_string.remove("get")
    identifier = " ".join(split_string)
    #print(f"{split_string} = {identifier_str}")
    return identifier

# returns an identifier operation that matches "choice"
def get_id_choice(choice=""):
    for op in myLists.api_ops:
        identifier = get_identifier(op)
        if identifier == choice:
            return op
    return

# call 
ID_CHOICE = get_id_choice("Session List")
BASE_URL= f"https://api.legiscan.com/?key={API_KEY}&op={ID_CHOICE}&state={STATE}"

def fetch():
    # Execute the GET request
    response = requests.get(BASE_URL)
    if response.status_code == 200:
        resp = response.json()
        print("status code 200, true")
        #print(resp)
        
        # Verify API status response
        if resp.get("status") == "OK":
            # Extract the bill master list payload
            data = resp.get(PARAMETER, {})
            print("resp.get status OK: true")
            print(f"OUTPUT: {data}")
        else:
            print("API Error:", resp.get("message", "Unknown error"))
    else:
        print(f"HTTP Request failed with status code: {response.status_code}")
    return

fetch()
get_identifier(myLists.api_ops[1])
