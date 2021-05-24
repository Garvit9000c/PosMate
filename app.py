from flask import Flask, render_template,jsonify,request
from PIL import Image
import PIL
import io
import os
import base64
# from AI import *

app = Flask(__name__)

global name

@app.route('/',methods=['GET','POST'])
def login():
        global name
        if request.method=='POST':
                name = request.form.get('name')
                # return render_template('camera.html')
        
        return render_template('home.html')
    
if __name__ == "__main__":
    app.run(debug=True, port=5000)
    
