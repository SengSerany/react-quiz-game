import React from "react";
import { mapAnswers } from "../functions/useMapAnswers";
import { sortAnswers } from "../functions/useSortAnswers";


export default function Questions({question, arrayAnswers}) {

    return(
        <div className="quiz-body">
            <h5 key={question.id} id={question.id} className="questions">{question}</h5>
            <div className="answers">
                {mapAnswers(sortAnswers(arrayAnswers))}
            </div>
            <hr></hr>
        </div>
    )
}