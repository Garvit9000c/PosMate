from flask import Flask, render_template,jsonify,request
from PIL import Image
import PIL
import io
import base64

app=Flask(__name__)
@app.route('/',methods=['GET','POST'])
def login():
   if request.method=='POST':
      pass
   return render_template('home.html')
   
@app.route("/image_info",methods= ['GET'])
def image_info():
    myfile= request.args.get('myimage').split(',')
    imgdata = base64.b64decode(myfile[1])
    im = Image.open(io.BytesIO(imgdata))
    im.save("./data/image.jpeg")
    width, height = im.size
    imgformat=im.format
    return jsonify(width=width,height=height,imgformat=imgformat)

@app.route('/camera')
def signup():
    return render_template('camera.html')
    
if __name__ == "__main__":
    app.run(debug=True)
