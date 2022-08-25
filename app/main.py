import cv2
import os
import io
import numpy as np
from flask import Flask, render_template, request, Response
from sklearn.cluster import KMeans

app = Flask(__name__)
maxIter = 10
maxColor = 20
app.config['MAX_CONTENT_PATH'] = 2000000


@app.route("/")
def home():
    return render_template("index.html", img="static/empty.jpg")


@app.route("/image/<string:ext>", methods=["GET", "POST"])
def path(ext):
    if request.method == 'POST':
        f = request.files["image"]

        img = cv2.imdecode(np.frombuffer(
            f.stream.read(), dtype=np.uint8), cv2.IMREAD_UNCHANGED)

        img_norm = img.astype(np.float16)/255.0
        img_norm = np.reshape(
            img_norm, (img_norm.shape[0]*img_norm.shape[1], 4))
        kmean = KMeans(n_clusters=maxColor, max_iter=maxIter,
                       n_init=10).fit(img_norm)
        recoverd = (kmean.cluster_centers_*255).astype(np.uint8)
        recImg = (kmean.predict(img_norm))
        recImg = recoverd[recImg]
        recImg = np.reshape(recImg, img.shape)
        
        #file buffer approach
        _, recImg = cv2.imencode("."+ext, recImg)
        recImg = io.BytesIO(recImg)
        
        return Response(recImg, mimetype="image/png")
    
    return "Something not right.."


@app.route("/remfromdisk", methods = ["POST"])
def getimage():
    os.remove("app/static/Images/" + request.json['path'])
    return "success"
