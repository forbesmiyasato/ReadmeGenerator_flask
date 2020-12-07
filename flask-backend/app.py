"""
A GitHub README flask backend.
"""
import flask
import os
from flask_wtf.csrf import CSRFProtect
from flask.views import MethodView
from index import Index
from translate import Translate
app = flask.Flask(__name__)       # our Flask app
csrf = CSRFProtect(app) # CSRF protection for translation api

app.config['SECRET_KEY'] = os.urandom(12).hex() # A secret key is required for flask_wtf's csrf protection

"""
Registering routes, assigning names to routes, and registering methods supported for each route
"""
app.add_url_rule('/',
                 view_func=Index.as_view('index'),
                 methods=["GET"])

app.add_url_rule('/translate',
                 view_func=Translate.as_view('translate'),
                 methods=['POST'])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
