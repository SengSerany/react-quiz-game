import React from "react";
import Answers from "../components/Answers";

import { checkAnswerClass } from "./checkAnswersClass";
import { selectAnAnswer } from "../functions/selectAnAnswer";

export function mapAnswers( answersSort ) {
    return answersSort.map( answer => {
        return (
            <Answers key={answer.id} answer={answer} answerClass={checkAnswerClass(answer)} selectAnAnswer={selectAnAnswer} />
        )
    })
}