import React from "react";
import "./App.css";

import Canvas from "./components/Canvas";
import Memory from "./components/Memory";

function App() {
    return (
        <div className="App">
            <h4>I'm making a game!</h4>

            <Canvas />

            <hr />

            <Memory />
        </div>
    );
}

export default App;
