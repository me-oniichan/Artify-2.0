const ImageArea = () => {
    return (
        <div className="body">
            <img id="image" src="static/components/empty.jpg" alt="" width="500px" />
            <label htmlFor="file">Upload</label>
            <input type="file" name="file" id="file" style={{ display: "none" }} accept="image/png, image/jpg, image/jpeg" />
            <button className="btn convert">Convert</button>
        </div>
    )
}

const Navbar = () => {
    return <div className="navbar">
        Artify
    </div>;
}

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <ImageArea />
        </React.Fragment>
    )
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);