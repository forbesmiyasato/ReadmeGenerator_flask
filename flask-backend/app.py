"""
A GitHub README flask backend.
"""
import flask
from flask.views import MethodView
from index import Index
from insert import Insert
from listings import Listings

app = flask.Flask(__name__)       # our Flask app

"""
Registering routes, assigning names to routes, and registering methods supported for each route
"""
app.add_url_rule('/',
                 view_func=Index.as_view('index'),
                 methods=["GET"])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
