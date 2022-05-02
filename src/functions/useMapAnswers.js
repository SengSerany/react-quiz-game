import React from "react";
import Answers from "../components/Answers";

import { checkAnswerClass } from "./useCheckAnswersClass";
import { selectAnAnswer } from "./useSelectAnAnswer";

export function mapAnswers( answersSort ) {
    return answersSort.map( answer => {
        return (
            <Answers key={answer.id} answer={answer} answerClass={checkAnswerClass(answer)} selectAnAnswer={selectAnAnswer} />
        )
    })
}