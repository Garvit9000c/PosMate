from flask import Flask, render_template,jsonify,request
from PIL import Image
import PIL
import io
import os
import base64
import yaml
# from config import MEDIA_FOLDER
from flask import send_from_directory
from flask_bootstrap import Bootstrap
# from AI import *
<<<<<<< HEAD
from flaskext.mysql import MySQL
from flask_mysqldb import MySQL
=======
>>>>>>> 3e9b25d9af421fc854dcc57d9404058b41d1ed01
# from datetime import datetime
MEDIA_FOLDER= os.path.join(os.path.dirname(os.path.dirname((os.path.abspath(__file__)))), 'data')

app = Flask(__name__)
<<<<<<< HEAD


db=yaml.load(open('db.yaml'))


app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']
 
mysql = MySQL(app)
=======
>>>>>>> 3e9b25d9af421fc854dcc57d9404058b41d1ed01

global name

@app.route('/',methods=['GET','POST'])
def login():
<<<<<<< HEAD
   if request.method=='POST':
    #   userDetails=request.form
      name = request.form.get('name')      
      cur = mysql.connection.cursor()
      cur.execute(" INSERT INTO users (name) VALUES (%s)",(name,))
      mysql.connection.commit()
      cur.close()
      return name
   return render_template('home.html')
=======
        global name
        if request.method=='POST':
                name = request.form.get('name')
                return render_template('camera.html')
        return render_template('home.html')
>>>>>>> 3e9b25d9af421fc854dcc57d9404058b41d1ed01
   
# @app.route("/image_info",methods= ['GET'])
# def image_info():
#     myfile= request.args.get('myimage').split(',')
#     imgdata = base64.b64decode(myfile[1])
#     im = Image.open(io.BytesIO(imgdata))
#     filename="./data/image.jpeg"
#     im.save(filename)
#     width, height = im.size
#     imgformat=im.format
#     keypoints=Dope(filename)
#     return jsonify(width=width,height=height,imgformat=imgformat)


@app.route('/uploads/<path:filename>')
def download_file(filename):
    return send_from_directory(MEDIA_FOLDER, filename, as_attachment=True)

    
if __name__ == "__main__":
    app.run(debug=True, port=5000)
    
