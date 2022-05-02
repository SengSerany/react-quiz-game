import React, { useContext } from "react";
import { setAnswersContext } from "../functions/useSetAnswersContext";

export default function Answers({answer, answerClass, selectAnAnswer}) {

    const setAnswers = useContext(setAnswersContext)

    return(
        <div
            id={answer.id}
            className={answerClass}
            onClick={() => selectAnAnswer(answer.id, answer.question_id, setAnswers)}>
            {answer.value}
        </div>     
    )
}