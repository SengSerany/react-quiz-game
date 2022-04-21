import React from "react";

export default function Quiz({arrayAnswers}) {

    const mapAnswers = () => {
        return arrayAnswers.map( answer => {
            return<p className="answer">{answer}</p>
        })
    }

    return(
        <div className="quiz-body">
            <h5 className="questions">The question is ?</h5>
            <div className="answers">
                {mapAnswers()}
            </div>
            <hr></hr>
        </div>
    )
}