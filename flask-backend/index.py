from flask import render_template
from flask.views import MethodView

class Index(MethodView):
    def get(self):
        """
        Accepts get requests, and renders the landing page of the README generator
        """
        return render_template('index.html', title="GitHub README Generator")
