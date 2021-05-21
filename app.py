from flask import Flask, app, render_template, redirect, request

app=Flask(__name__)
@app.route('/',methods=['GET','POST'])
def login():
   if request.method=='POST':
      pass
   return render_template('home.html')

@app.route('/camera')
def signup():
    return render_template('camera.html')
if __name__ == "__main__":
    app.run(debug=True)
