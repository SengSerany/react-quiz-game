import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css"
import App from "./App";
import Toggler from "./components/Toggler";


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
    <Toggler render={
        (on, toggle) => {
            return(
                <App on={on} toggle={toggle} />
            )
        }
    } />
)