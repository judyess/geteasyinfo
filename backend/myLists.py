import re

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

idList = [
'Session List', 
'Master List', 
'Master List Raw', 
'Bill', 
'Bill Text', 
'Amendment', 
'Supplement', 
'Roll Call', 
'Person', 
'Search', 
'Search Raw',
'Dataset List', 
'Dataset', 
'Dataset Raw', 
'Session People', 
'Sponsored List', 
'Monitor List', 
'Monitor List Raw', 
'Monitor']
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
    for op in api_ops:
        identifier = get_identifier(op)
        if identifier == identifier_choice:
            return op
    return
def getlist():
    list = []
    for item in api_ops:
        op = get_identifier(item)
        list.append(op)
    print(list)
    return list

getlist()




