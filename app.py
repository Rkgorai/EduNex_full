from flask import Flask
from routes.check_connections import check_connections_blueprint
from routes.global_schema import global_schema_blueprint
from routes.filters.filter_schema import filtered_schema_blueprint, unique_values_blueprint, post_filter_blueprint


app = Flask(__name__)

# Register blueprints
app.register_blueprint(check_connections_blueprint)
app.register_blueprint(global_schema_blueprint, url_prefix='/global-schema')
app.register_blueprint(filtered_schema_blueprint, url_prefix='/filter-schema')
app.register_blueprint(unique_values_blueprint, url_prefix='/unique-values')
app.register_blueprint(post_filter_blueprint, url_prefix='/filter-args')

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=3000)
