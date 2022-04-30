import React from "react";

export default function Footer({handleCheckAnswers, endStatus, handleNewGame, goodAnswersNb}) {

    const goodAnswersNbProp = goodAnswersNb()

    const checkOrRestart = () => {
        if (!endStatus) {
            return (
                <button 
                    type="button"
                    className="footer--btn ingame"
                    onClick={handleCheckAnswers}
                >Check answers</button>
            )
        } else {
            return (
                <div className="endgame-div">
                    <h5>You scored {goodAnswersNbProp}/5 correct answer{goodAnswersNbProp > 1 && "s"}</h5>
                    <button type="button" className="footer--btn offgame" onClick={() => {handleNewGame()}}>Play again</button>
                </div>
            )
        }
    }

    return (
        <footer>
            {checkOrRestart()}
        </footer>
    )
}