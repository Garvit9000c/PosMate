from flask import Flask, render_template,jsonify,request,redirect,url_for
import time
from model import *
app = Flask(__name__)

global data
data={ 'name':'Name', 'flag':False, 'train':[], 'test':[], 'LSP':None ,'time':time.time()}

POSE_LABEL={
    0:'Correct',
    1:'Posture is not Correct, Sit straight',
    2:'Dont lean towards screen',
    3:'Dont lean away from screen',
    4:'Break Is Over',
    5:'Take a 5Min Break, Drink Water & Do Some Streching',
}

@app.route('/home',methods=['GET','POST'])
def home():
    global data
    if request.method=='POST':
       data['name'] = request.form.get('login') 
       return redirect(url_for('work'))
    else:   
        return render_template('home.html')        

@app.route('/')
def loading():
    return render_template('loading.html')

@app.route('/work')
def work():
    return render_template('work.html')



@app.route("/image_info",methods= ['GET'])
def image_info():
    keypoints= eval(request.args.get('data'))
    x=render(keypoints)
    if x==0:
    	state,msg=1,'Sit Straight'
    else:
        state,msg=0,' '
    return jsonify(state=state,msg=msg)


    
if __name__ == "__main__":
    app.run(debug=True)
