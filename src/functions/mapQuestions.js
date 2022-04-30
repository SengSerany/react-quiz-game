import React from "react";
import Questions from "../components/Questions"
import { nanoid } from "nanoid";

export function mapQuestions(questions, answers, setAnswers, parseEntities) {
                        
    return questions.map( questionObject => {

        const answersOfQuestion = answers.filter(answer => answer.question_id === questionObject.id);

        return (
            <Questions
                question = {parseEntities(questionObject.question)}
                arrayAnswers ={answersOfQuestion}
                setAnswers = {setAnswers}
                key = {nanoid()}
            />
        )
    })
}