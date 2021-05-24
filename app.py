from flask import Flask, render_template,jsonify,request
from PIL import Image
import PIL
import io
import os
import base64
from flask_bootstrap import Bootstrap
from AI import *
from datetime import datetime


app = Flask(__name__)

global name

@app.route('/',methods=['GET','POST'])
def login():
        global name
        if request.method=='POST':
                name = request.form.get('name')
                # return render_template('camera.html')
        
        return render_template('home.html')
   
@app.route("/image_info",methods= ['GET'])
def image_info():
    myfile= request.args.get('myimage').split(',')
    imgdata = base64.b64decode(myfile[1])
    im = Image.open(io.BytesIO(imgdata))
    filename="./data/image.jpeg"
    im.save(filename)
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    keypoints=Coordinate(filename)
    print(keypoints)
    return jsonify(x=0)


    
if __name__ == "__main__":
    app.run(debug=True, port=5000)
    
