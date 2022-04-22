import React from "react";

export default function Footer({handleCheckAnswers, endStatus}) {

    const checkOrRestart = () => {
        console.log(endStatus)
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
                    <h5>You scored x/5 correct answers</h5>
                    <button type="button" className="footer--btn offgame">Play again</button>
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