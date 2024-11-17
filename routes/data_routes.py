# from flask import Blueprint, request, jsonify
# from db_config import connect_to_db, db_configs

# data_routes = Blueprint('data_routes', __name__)

# @data_routes.route('/fetch-data', methods=['GET'])
# def fetch_data():
#     results = []
#     for config in db_configs:
#         connection = connect_to_db(config)
#         if connection:
#             cursor = connection.cursor(dictionary=True)
#             cursor.execute("SELECT * courses")  # Replace with your actual table
#             data = cursor.fetchall()
#             results.extend(data)
#             cursor.close()
#             connection.close()

#     return jsonify(results)

# @data_routes.route('/filter-offerings', methods=['GET'])
# def filter_offerings():
#     # Extract parameters from the request
#     title = request.args.get('title')
#     location = request.args.get('location')
#     platform = request.args.get('platform')
    
#     # Implement query logic to filter data based on parameters
#     # Return the aggregated response
#     return jsonify({"message": "Filtered data based on parameters"})
