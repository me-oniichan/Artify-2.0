const Loading = () => {
    return (
        <div className="convert">
            Converting {"  "}
            <div className="animation">
                <div className="ball"></div>
                <div className="ball" style={{ animationDelay: "0.25s", background: "#9448ff" }}></div>
                <div className="ball" style={{ animationDelay: "0.5s", background: "purple" }}></div>
            </div>
        </div>
    );
};

let blob;
const ImageArea = () => {
    const source = "static/components/empty.jpg";
    const [loading, setLoading] = React.useState(false);

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
            .post("https://artify-2.herokuapp.com/image/" + ext, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                responseType : "blob"
            })
            .then((response) => {
                let elem =document.getElementById("image")
                elem.src = URL.createObjectURL(response.data)

                elem.onload = function(){
                    URL.revokeObjectURL(elem.src);
                    elem.onload = function(){}
                }
                
                setLoading(false);
            });
    };

    return (
        <div className="body">
            {loading ? <Loading /> : ""}
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
            <button
                className="btn"
                onClick={() => {
                    setLoading(true);
                    Convert();
                }}
            >
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
