import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/todo");
    }, []);
    return <div className="App"></div>;
}

export default App;
