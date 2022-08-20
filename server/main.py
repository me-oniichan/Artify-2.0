from flask import Flask, request, render_template
import cv2
import numpy as np
from sklearn.cluster import KMeans
from uuid import uuid4

app = Flask(__name__);
maxIter =10
maxColor =23
app.config['MAX_CONTENT_PATH'] = 2000000
@app.route("/")
def home():
    return "This is home route"

@app.route("/image", methods = ["GET", "POST"])
def path():
    if request.method == 'POST':
        f = request.files["image"]
        path = "static/"+ str(uuid4())
        f.save(path)
        img  = cv2.imread(path)
        
        img_norm = img.astype(np.float16)/255.0
        img_norm = np.reshape(img_norm, (img_norm.shape[0]*img_norm.shape[1], 3))
        kmean = KMeans(n_clusters=maxColor, max_iter=maxIter, n_init = 7).fit(img_norm)
        recoverd =(kmean.cluster_centers_*255).astype(np.uint8)
        recImg = (kmean.predict(img_norm))
        recImg = recoverd[recImg]
        recImg = np.reshape(recImg, (img.shape[0],img.shape[1],3))
        cv2.imwrite(path, recImg)
        return render_template("index.html", img = path)
    return "Something not right.."
app.run()