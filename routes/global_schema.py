from flask import Blueprint, jsonify
import pandas as pd
from sqlalchemy import create_engine, text
from utils.db_connection import db_configs, queries
from utils.db_utils import fetch_data_from_db
import pymysql

# Create a blueprint for the global schema
global_schema_blueprint = Blueprint('global_schema', __name__)

# Define the table schema
CREATE_TABLE_SQL = """
DROP TABLE IF EXISTS global_schema_table;
CREATE TABLE IF NOT EXISTS global_schema_table (
    offering_id VARCHAR(62) NULL,
    title MEDIUMTEXT NULL,
    tutor_name LONGTEXT NULL,
    platform_name MEDIUMTEXT NULL,
    difficulty_level MEDIUMTEXT NULL,
    price VARCHAR(20) NULL,
    rating VARCHAR(22) NULL,
    description MEDIUMTEXT NULL,
    Mode MEDIUMTEXT NULL,
    num_enrollments DOUBLE NULL,
    offering_type VARCHAR(3) NOT NULL,
    location MEDIUMTEXT NULL,
    certifications VARCHAR(3) NOT NULL
);
"""

def fetch_global_schema_data():
    global_data = pd.DataFrame()
    for i, config in enumerate(db_configs):
        if i < len(queries):  # Check if there's a corresponding query
            data = fetch_data_from_db(config, queries[i])
            global_data = pd.concat([global_data, data], ignore_index=True)
        else:
            print(f"Warning: No query for database config {i}")
    return global_data

# Function to create a connection
def create_connection(config):
    try:
        conn = pymysql.connect(
            host=config['host'],
            user=config['user'],
            password=config['password'],
            database=config['database']
        )
        return conn
    except Exception as e:
        print(f"Error creating database connection: {e}")
        return None

# Function to create the table
def create_table(connection, create_table_sql):
    try:
        with connection.cursor() as cursor:
            cursor.execute(create_table_sql)
        connection.commit()
        print("Table created or already exists.")
    except Exception as e:
        print(f"Error creating table: {e}")

# Function to save DataFrame to SQL
def save_to_sql(dataframe, table_name, connection):
    try:
        with connection.cursor() as cursor:
            for idx, row in dataframe.iterrows():
                # Remove duplicate columns (if Mode or any other column appears more than once)
                row = row.loc[~row.index.duplicated()]
                
                # Handle NaN values by replacing them with None (which will be treated as NULL in SQL)
                row = row.where(pd.notnull(row), None)
                
                # Ensure no duplicate columns in the insert statement
                columns = [f"`{col}`" for col in row.index]
                placeholders = ", ".join(["%s"] * len(row))
                
                # Only insert unique columns
                sql = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES ({placeholders})"
                
                print(f"Inserting Row {idx}: {tuple(row)}")  # Log row data
                
                cursor.execute(sql, tuple(row))
        connection.commit()
        print("All rows successfully inserted.")
        return True
    except Exception as e:
        print(f"Error saving row to SQL: {e}")
        return False

# Endpoint to display the global schema data
@global_schema_blueprint.route('/', methods=['GET'])
def display_global_schema():
    global_data = fetch_global_schema_data()
    
    # Check if the global schema has any data
    if not global_data.empty:
        # Save the data to a CSV file with fields enclosed in double quotes
        file_path = "global_schema_data.csv"
        global_data.to_csv(file_path, index=False, quotechar='"', quoting=1)  # quoting=1 means QUOTE_ALL
        
        # Use the first database in db_configs to create the table and save data
        db_config = db_configs[2]
        connection = create_connection(db_config)
        
        if connection:
            # Create the table if it doesn't exist
            create_table(connection, CREATE_TABLE_SQL)
            
            # Save the data to the SQL table
            table_name = "global_schema_table"
            db_status = save_to_sql(global_data, table_name, connection)
            
            connection.close()  # Close the connection
            
            if db_status:
                return jsonify({
                    "message": f"Data saved to {file_path} and table '{table_name}' in the database.",
                    "data": global_data.to_dict(orient='records')
                })
            else:
                return jsonify({
                    "message": "Data saved to CSV but failed to save to the database.",
                    "error": "Database insertion error."
                }), 500
        else:
            return jsonify({
                "message": "Failed to connect to the database.",
                "error": "Database connection error."
            }), 500
    else:
        return jsonify({"message": "No data retrieved from databases."}), 404
