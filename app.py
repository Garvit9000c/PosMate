from flask import Flask, render_template,jsonify,request
from PIL import Image
import PIL
import io
import os
import base64
# from config import MEDIA_FOLDER
from flask import send_from_directory
from flask_bootstrap import Bootstrap
# from AI import *
from flaskext.mysql import MySQL
# from datetime import datetime
MEDIA_FOLDER= os.path.join(os.path.dirname(os.path.dirname((os.path.abspath(__file__)))), 'data')

app = Flask(__name__)
  

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Subinsk284@'
app.config['MYSQL_DB'] = 'flask'
 
mysql = MySQL(app)
# date_created=db.Column(db.DateTime, default=datetime.utcnow)


@app.route('/',methods=['GET','POST'])
def login():
   if request.method=='POST':
      name = request.form['name']
      
      cursor = mysql.connection.cursor()
      cursor.execute(''' INSERT INTO images VALUES(%s)''',(name))
      mysql.connection.commit()
      cursor.close()
      return f"Done!!"
   return render_template('home.html')
   
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
@app.route('/camera')
def camera():
    return render_template('camera.html')
    
if __name__ == "__main__":
    app.run(debug=True, port=5000)
