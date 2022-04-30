import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css"
import App from "./App";
import Toggler from "./components/Toggler";


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
    <Toggler render = {
        (newCycle, restartGame) => {
            return (
                <Toggler render={
                    (inGame, inGameToggle) => {

                        const lanchNewGame = () => {
                            if (newCycle === true) {
                                restartGame()
                            }
                        }

                        return(
                            <App
                                inGame={ inGame }
                                inGameToggle={ inGameToggle }
                                newCycleStatus={ newCycle }
                                handleRestart={ restartGame }
                                lanchNewGame = { lanchNewGame }
                            />
                        )
                    }
                } />
            )
        }
    } />
)