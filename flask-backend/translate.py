from flask import request
from flask import render_template
from flask.views import MethodView
from google.cloud import translate_v2 as translate
import six

class Translate(MethodView):
    def post(self):
        translate_client = translate.Client()

        text = request.form.get('content')
        if isinstance(text, six.binary_type):
    	    text = text.decode("utf-8")

        print(text)
        # Text can also be a sequence of strings, in which case this method
        # will return a sequence of results for each text.
        result = translate_client.translate(text, target_language='zh-CN')

        print(u"Text: {}".format(result["input"]))
        print(u"Translation: {}".format(result["translatedText"]))
        return result["translatedText"]
