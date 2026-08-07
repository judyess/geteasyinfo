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
"setMonitor", 
]


# CLEAN DATA

# splits an API identifier operation and returns an identifier
# call: get_identifier(api_ops[1])
# call: get_identifier()
def get_identifier(api_operation="get"):
    split_string = re.split(r'(?=[A-Z])', api_operation)
    split_string.remove("get")
    identifier_str = " ".join(split_string)
    print(f"{split_string} = {identifier_str}")
    return identifier_str