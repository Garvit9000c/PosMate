from flask import Flask, render_template, jsonify, request, redirect, url_for
import time
from model import *


app = Flask(__name__)


@app.route('/home', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        name = request.form.get('login')
        return redirect(url_for('work'))
    else:
        return render_template('home.html')


@app.route('/')
def loading():
    return render_template('loading.html')


@app.route('/work')
def work():
    return render_template('work.html')


@app.route("/image_info", methods=['GET'])
def image_info():
    keypoints = eval(request.args.get('data'))
    state = render(keypoints)
    return jsonify(state=state)


if __name__ == "__main__":
    app.run(debug=True)
