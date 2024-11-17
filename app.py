from flask import Flask
from routes.check_connections import check_connections_blueprint

app = Flask(__name__)

# Register blueprints
app.register_blueprint(check_connections_blueprint)

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=3000)
