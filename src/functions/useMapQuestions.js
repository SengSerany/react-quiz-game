import React from "react";
import Questions from "../components/Questions"

export function mapQuestions(questions, answers, parseEntities) {
                        
    return questions.map( questionObject => {

        const answersOfQuestion = answers.filter(answer => answer.question_id === questionObject.id);

        return (
            <Questions
                question = {parseEntities(questionObject.question)}
                arrayAnswers ={answersOfQuestion}
                key = {questionObject.id}
            />
        )
    })
}