import Navbar from "./Navbar";

function App(){
    return(
        <Navbar/>
    )
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(<App/>);