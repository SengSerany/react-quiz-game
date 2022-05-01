import React from "react";
import { SetAnswersConsumer } from "../functions/setAnswersContext";

export default function Answers({answer, answerClass, selectAnAnswer}) {

    return(
        <SetAnswersConsumer>
            { setAnswers => (
                <div
                    id={answer.id}
                    className={answerClass}
                    onClick={() => selectAnAnswer(answer.id, answer.question_id, setAnswers)}>
                    {answer.value}
                </div>
            )}
        </SetAnswersConsumer>
        
    )
}