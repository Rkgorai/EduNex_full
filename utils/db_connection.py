import mysql.connector

# List of database configurations
db_configs = [
    {
        'host': '192.168.42.218',
        'user': 'root',
        'password': 'rahul',
        'database': 'nptel',
    },
    {
        'host': '192.168.42.218',
        'user': 'root',
        'password': 'rahul',
        'database': 'skill_course_database',
    },
    {
        'host': '192.168.42.218',
        'user': 'root',
        'password': 'rahul',
        'database': 'tutordb',
    },
    {
        'host': '192.168.42.218',
        'user': 'root',
        'password': 'rahul',
        'database': 'db4',
    }
]

# Function to create a database connection from a config
def create_connection(config):
    try:
        connection = mysql.connector.connect(
            host=config['host'],
            user=config['user'],
            password=config['password'],
            database=config['database']
        )
        if connection.is_connected():
            return True, None
    except mysql.connector.Error as err:
        return False, str(err)
    finally:
        if 'connection' in locals() and connection.is_connected():
            connection.close()
