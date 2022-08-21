const ImageArea = () =>{
    return(
        <img src="static/components/empty.jpg" alt="" />
    )
}

const Navbar =()=> {
    return <div className="navbar">
        Artify 
    </div>;
}

function App(){
    return(
        <React.Fragment>
            <Navbar/>
            <ImageArea/>
        </React.Fragment>
    )
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(<App/>);