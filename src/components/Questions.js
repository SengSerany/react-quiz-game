import React from "react";


export default function Questions({arrayQuestionObjects, arrayAnswers}) {

    const mapAnswers = () => {
        return arrayAnswers.map( answer => {
            return<p className="answer">{answer.value}</p>
        })
    }

    return(
        <div className="quiz-body">
            <h5 className="questions">{arrayQuestionObjects}</h5>
            <div className="answers">
                {mapAnswers()}
            </div>
            <hr></hr>
        </div>
    )
}