import React from "react";
import Answers from "./Answers";

export default function Questions({question, arrayAnswers, answerSelected}) {

    return(
        <div className="quiz-body">
            <h5 key={question.id} id={question.id} className="questions">{question}</h5>
            <Answers arrayAnswers={arrayAnswers} answerSelected={answerSelected}/>
            <hr></hr>
        </div>
    )
}