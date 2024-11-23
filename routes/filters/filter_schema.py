from flask import Blueprint, jsonify
import pandas as pd
from utils.db_connection import db_configs, queries
from utils.db_utils import fetch_data_from_db
from routes.filters.sql_filter_utils import filter_query_with_functions
from routes.global_schema import fetch_global_schema_data

# Create a blueprint for the filtered schema
filtered_schema_blueprint = Blueprint('filtered_schema', __name__)
unique_values_blueprint = Blueprint('unique_values', __name__)

# Define filter criteria
filters = {
    "title": "algo",
    "platform_name": ["nptel", "edx"],
    "difficulty_level": ["all levels", "beginner", "advanced"],
    # "price": "free",
    # "rating": ">4.5",
    # "Mode": "online",
    # "num_enrollments": ">1000",
    # "offering_type": ["db3", "db1"],
    # "location": "remote",
    "certifications": "yes"
}

df = fetch_global_schema_data()

# Specify the columns of interest
columns_of_interest = ["platform_name", "difficulty_level", "location"]

# Extract unique values for each column and store them as lists in a dictionary
unique_values = {col: df[col].dropna().str.lower().unique().tolist() for col in columns_of_interest}

def fetch_filtered_schema_data():
    filtered_data = pd.DataFrame()
    for i, config in enumerate(db_configs):
        if i < len(queries):  # Check if there's a corresponding query

            # Apply filters to the query
            filtered_query = filter_query_with_functions(queries[i], filters, unique_values)

            data = fetch_data_from_db(config, filtered_query)
            filtered_data = pd.concat([filtered_data, data], ignore_index=True)
        else:
            print(f"Warning: No query for database config {i}")
    return filtered_data


# Endpoint to display the filtered schema data
@filtered_schema_blueprint.route('/', methods=['GET'])
def display_filtered_schema():
    filtered_data = fetch_filtered_schema_data()
    
    # Check if the filtered schema has any data
    if not filtered_data.empty:
        return jsonify(filtered_data.to_dict(orient='records'))
    else:
        return jsonify({"message": "No data retrieved from databases."}), 404
    

@unique_values_blueprint.route('/', methods=['GET'])
def display_filtered_schema():
    df = fetch_global_schema_data()

    # Ensure the dataframe is not empty
    if df.empty:
        return jsonify({"message": "No data retrieved from databases."}), 404

    # Specify the columns of interest
    columns_of_interest = ["platform_name", "difficulty_level", "location"]

    # Extract unique values for each column and store them as lists in a dictionary
    unique_values = {col: df[col].dropna().str.lower().unique().tolist() for col in columns_of_interest}

    # Check if unique values contain any data
    if all(len(values) > 0 for values in unique_values.values()):
        return jsonify(unique_values)
    else:
        return jsonify({"message": "No unique values found for specified columns."}), 404


