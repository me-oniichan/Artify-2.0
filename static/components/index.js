const ImageArea = () => {
    const [source, setSource] = React.useState("static/components/empty.jpg");

    let image = new Image();
    image.src = source;
    image.onload = function () {
        let ratio = image.width / image.height;
        if (image.height > 500) image.height = 500;
        else if (image.width > 600) {
            image.width = 600;
            image.height = image.width / ratio;
        }

        document.getElementById("image").height = image.height;
    };
    const Upload = (e) => {
        if (e.target.files[0])
            setSource(URL.createObjectURL(e.target.files[0]));
    };

    const Convert = () => {
        const formData = new FormData();
        const imagefile = document.querySelector('#file');
        formData.append("image", imagefile.files[0]);
        axios.post('http://127.0.0.1:5000/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response=>{
            console.log(response)
        })

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
