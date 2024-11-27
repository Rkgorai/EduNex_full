# db_utils.py

import mysql.connector
import pandas as pd

def fetch_data_from_db(config, query):
    """Connects to the database and retrieves data."""
    try:
        connection = mysql.connector.connect(
            host=config['host'],
            user=config['user'],
            password=config['password'],
            database=config['database']
        )
        if connection.is_connected():
            data = pd.read_sql(query, connection)
            return data
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return pd.DataFrame()
    finally:
        if 'connection' in locals() and connection.is_connected():
            connection.close()
