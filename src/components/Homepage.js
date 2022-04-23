import React from "react";

export default function Homepage({play, prepareAnswers}) {
    return(
        <main className="homepage">
            <h1>Quizzical</h1>
            <p>Test your knowledge !</p>
            <button type="button" onClick={play}>Start quiz</button>
        </main>
    )
}