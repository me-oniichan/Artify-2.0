const ImageArea = () => {
    const source = "static/components/empty.jpg";

    let blob;

    const Upload = (e) => {
        if (!e.target.files[0]) return;

        let image = new Image();
        image.src = URL.createObjectURL(e.target.files[0]);
        image.onload = function () {
            let ratio = image.width / image.height;
            if (image.height > 500) {
                image.height = 500;
                image.width = ratio * 500;
            }
            if (image.width > 800) {
                image.width = 800;
                image.height = image.width / ratio;
            }

            let canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            canvas.toBlob((b) => {
                let link = URL.createObjectURL(b);
                document.getElementById("image").src = link;
                blob = b;
            });
            URL.revokeObjectURL(image.src);
        };
    };

    const Convert = () => {
        const formData = new FormData();
        let imagefile = document.querySelector("#file");
        let ext = imagefile.files[0].name.split(".");
        ext = ext[ext.length - 1];
        formData.append("image", blob);

        axios
            .post("http://127.0.0.1:5000/image/" + ext, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                document.getElementById("image").src =
                    "http://127.0.0.1:5000/static/Images/" + response.data;
                document.getElementById("image").onload = function () {
                    axios
                        .post("http://127.0.0.1:5000/remfromdisk", {
                            path: response.data,
                        })
                        .then((r) => {
                            
                        });
                };
            });
    };

    return (
        <div className="body">
            <img id="image" src={source} alt="" />
            <label htmlFor="file">Upload</label>
            <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => {
                    Upload(e);
                }}
            />
            <button className="btn" onClick={Convert}>
                Convert
            </button>
        </div>
    );
};

const Navbar = () => {
    return <div className="navbar">Artify</div>;
};

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <ImageArea />
        </React.Fragment>
    );
}

const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);
