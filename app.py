from flask import Flask, render_template,jsonify,request,redirect
from PIL import Image
import PIL
import io
import os
import base64
from AI import *
from Logistic import *


app = Flask(__name__)

global data
data={ 'name':'Name', 'flag':False, 'train':[], 'test':[], 'LSP':None }

POSE_LABEL={
    0:'Correct',
    1:'Posture is not Correct, Sit straight',
    2:'Dont lean towards screen',
    3:'Dont lean away from screen',
    4:'Break Is Over',
    5:'Take a 5Min Break, Drink Water & Do Some Streching',
}

@app.route('/')
def login():
    global data
    #if request.method=='POST':
    #    data['name'] = request.form.get('name')    
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
    data['train']=[]
    return render_template('Calibration.html')

@app.route('/Monitoring')
def Monitoring():
    global data
    data['flag']=False
    data['test']=[]
    return render_template('Monitoring.html')

           
@app.route("/image_info",methods= ['GET'])
def image_info():
     global data
     myfile= request.args.get('myimage').split(',')
     imgdata = base64.b64decode(myfile[1])
     im = Image.open(io.BytesIO(imgdata))
     filename="./data/image.jpeg"
     im.save(filename)
     keypoints=Coordinate(filename)
     if data['flag']:
         if len(data['train'])<10:
             data['train'].append(keypoints)
             return jsonify(x=0)
         if len(data['train'])==10:
             data['train']=trainCoordinates_process(data['train'])
             return jsonify(x=1)  
     flag,data['LSP']=btfunc(data['LSP'])
     if flag==False:
     	msg = Posture(data['train'], keypoints)
     	if msg==0:
     	    state,msg=0,None
     	else:
     	    state,msg=1,POSE_LABEL[msg]
     if flag=='break':
         state,msg=0,None
     if flag=='start':
         state,msg=1,POSE_LABEL[4] 
     if flag==True:
         state,msg=1,POSE_LABEL[5]   
     return jsonify(state=state,msg=msg)


    
if __name__ == "__main__":
    app.run(debug=True)
    
