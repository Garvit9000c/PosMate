from flask import Flask, render_template,jsonify,request,redirect
from PIL import Image
import PIL
import io
import os
import base64
from flask_bootstrap import Bootstrap
# from AI import *
from datetime import datetime


app = Flask(__name__)

global data
data={ 'name':'Name', 'flag':True, 'train':[], 'test':[] }

@app.route('/',methods=['GET','POST'])
def login():
    global data
    if request.method=='POST':
        data['name'] = request.form.get('name')    
    return render_template('home.html')        


@app.route('/instructions',methods=['GET','POST'])
def instructions():
    if request.method=='POST':
        return redirect('/Calibration')
    return render_template('instructions.html')



@app.route('/Calibration')
def Calibration():
    global data
    data['flag']=True
    return render_template('Calibration.html')

@app.route('/Monitoring')
def Monitoring():
    global data
    data['flag']=False
    return render_template('Monitoring.html')

           
# @app.route("/image_info",methods= ['GET'])
# def image_info():
#     global data
#     myfile= request.args.get('myimage').split(',')
#     imgdata = base64.b64decode(myfile[1])
#     im = Image.open(io.BytesIO(imgdata))
#     filename="./data/image.jpeg"
#     im.save(filename)
#     now = datetime.now()
#     current_time = now.strftime("%H:%M:%S")
#     keypoints=Coordinate(filename)
#     if data['flag']:
#         if len(data['train'])<10:
#             data['train'].append(keypoints)
#         if len(data['train'])==10:
#             return jsonify(x=1)    	
#     print(keypoints)
#     return jsonify(x=0)


    
if __name__ == "__main__":
    app.run(debug=True, port=5000)
    
