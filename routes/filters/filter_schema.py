import requests
from flask import Blueprint, jsonify, request
import pandas as pd
from utils.db_connection import db_configs, queries
from utils.db_utils import fetch_data_from_db
from routes.filters.sql_filter_utils import filter_query_with_functions
from routes.global_schema import fetch_global_schema_data

# Create blueprints
filtered_schema_blueprint = Blueprint('filtered_schema', __name__)
unique_values_blueprint = Blueprint('unique_values', __name__)
post_filter_blueprint = Blueprint('dummy_filter', __name__)

# Define the columns of interest
columns_of_interest = ["platform_name", "difficulty_level", "location"]

# Function to fetch filters from dummy endpoint
def fetch_filters_from_api():
    try:
        response = requests.get("http://127.0.0.1:3000/filter-args")  # Adjust the port if necessary
        response.raise_for_status()
        return response.json()  # Parse the JSON response
    except requests.exceptions.RequestException as e:
        print(f"Error fetching filters from dummy endpoint: {e}")
        return {}

# Function to fetch unique values
def get_unique_values():
    df = fetch_global_schema_data()
    unique_values = {col: df[col].dropna().str.lower().unique().tolist() for col in columns_of_interest}
    return unique_values

# Function to fetch filtered schema data
def fetch_filtered_schema_data(filters, unique_values):
    """
    Fetch data from all databases based on filters.

    Parameters:
    - filters (dict): Dictionary of filters.
    - unique_values (dict): Dictionary of unique values for categorical filtering.

    Returns:
    - DataFrame: Combined filtered data from all databases.
    """
    filtered_data = pd.DataFrame()

    for i, config in enumerate(db_configs):
        if i < len(queries):  # Check if there's a corresponding query
            filtered_query = filter_query_with_functions(queries[i], filters, unique_values)
            print(f"Query for database {i}: {filtered_query}")  # Debugging output
            data = fetch_data_from_db(config, filtered_query)
            filtered_data = pd.concat([filtered_data, data], ignore_index=True)
        else:
            print(f"Warning: No query for database config {i}")

    return filtered_data

# Endpoint to display the filtered schema data
@filtered_schema_blueprint.route('/', methods=['GET'])
def display_filtered_schema():
    # Fetch filters from the dummy endpoint
    filters = fetch_filters_from_api()

    if not filters:
        print("No filters provided. Fetching all data...")
        filters = {}  # Ensure all data is fetched when no filters are present.

    # Get unique values for filtering
    unique_values = get_unique_values()

    # Fetch the filtered schema data
    filtered_data = fetch_filtered_schema_data(filters, unique_values)

    # Check if the filtered schema has any data
    if not filtered_data.empty:
        return jsonify(filtered_data.to_dict(orient='records'))
    else:
        return jsonify({"message": "No data retrieved from databases."}), 404


# Endpoint to display unique values for filtering
@unique_values_blueprint.route('/', methods=['GET'])
def display_unique_values():
    unique_values = get_unique_values()
    if all(len(values) > 0 for values in unique_values.values()):
        return jsonify(unique_values)
    else:
        return jsonify({"message": "No unique values found for specified columns."}), 404

# Dummy filter endpoint
@post_filter_blueprint.route('/', methods=['GET'])
def post_filter_values():
    filters = {
        "title": "algo",
        "platform_name": ["nptel", "udemy","udacity"],
        # "difficulty_level": ["all levels", "beginner", "advanced"],
        # "price": "free",
        # "rating": ">4.5",
        "Mode": "online",
        # "num_enrollments": ">1000",
        # "offering_type": ["db3", "db1"],
        # "location": "remote",
        # "certifications": "yes"
    }
    return jsonify(filters)
