from flask import Blueprint, jsonify
import pandas as pd
from utils.db_connection import db_configs, queries
from utils.db_utils import fetch_data_from_db

# Create a blueprint for the global schema
global_schema_blueprint = Blueprint('global_schema', __name__)

def fetch_global_schema_data():
    global_data = pd.DataFrame()
    for i, config in enumerate(db_configs):
        if i < len(queries):  # Check if there's a corresponding query
            data = fetch_data_from_db(config, queries[i])
            global_data = pd.concat([global_data, data], ignore_index=True)
        else:
            print(f"Warning: No query for database config {i}")
    return global_data


# Endpoint to display the global schema data
@global_schema_blueprint.route('/', methods=['GET'])
def display_global_schema():
    global_data = fetch_global_schema_data()
    
    # Check if the global schema has any data
    if not global_data.empty:
        return jsonify(global_data.to_dict(orient='records'))
    else:
        return jsonify({"message": "No data retrieved from databases."}), 404
