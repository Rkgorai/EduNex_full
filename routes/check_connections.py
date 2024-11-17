from flask import Blueprint, jsonify
from utils.db_connection import create_connection, db_configs

check_connections_blueprint = Blueprint('check_connections', __name__)

@check_connections_blueprint.route('/check-connections', methods=['GET'])
def check_connections():
    connection_status = {}

    for i, db_config in enumerate(db_configs, start=1):
        db_name = db_config['database']
        status, error = create_connection(db_config)
        if status:
            connection_status[f'Database {i} ({db_name})'] = 'Connected'
        else:
            connection_status[f'Database {i} ({db_name})'] = f'Connection Failed: {error}'

    return jsonify(connection_status)


