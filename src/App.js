import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Homepage from "./components/Homepage";
import Questions from "./components/Questions";

export default function App() {

    const [ enterTheGame, setEnterTheGame] = useState(false)
    const [ questions, setQuestions] = useState([])
    const [ answers, setAnswers] = useState(() => {
        if (questions) {
            
        } else {
            return []
        }
    })

    const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;


    const letsPlay = () => {
        setEnterTheGame(true);
    }
    
    useEffect(() => {
        const callAPI = async () => {
            const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple");
            const data = await res.json();
            setQuestions(data.results.map( questionsNoId => {
                return {...questionsNoId, id: nanoid()}
            }))
        }
        callAPI()
    }, [])
    
    const organizeAnswers = () => {
        const allAnswers = []
        for (let i = 0; i < questions.length; i++) {
            allAnswers.push({
                value: parseEntities(questions[i].correct_answer),
                question_id: questions[i].id,
                id: nanoid(),
                isSelected: false
            })

            for (let j = 0; j < questions[i].incorrect_answers.length; j++) {
                allAnswers.push({
                    value: parseEntities(questions[i].incorrect_answers[j]),
                    question_id: questions[i].id,
                    id: nanoid(),
                    isSelected: false
                })
            }
        }
        return setAnswers(allAnswers)
    }

    const mapQuestions = () => {
        return questions.map( questionObject => {

            const answersOfQuestion = answers.filter(answer => answer.question_id === questionObject.id);


            return (
                <Questions
                    question = {parseEntities(questionObject.question)}
                    arrayAnswers ={answersOfQuestion}
                    answerSelected = {selectAnAnswer}
                />
            )

        })
    }

    const selectAnAnswer = (answerSelectedID, concernedQuestionID) => {
        setAnswers( prevAnswersState => {
            return prevAnswersState.map(answerObject => {
                if (answerObject.id === answerSelectedID) {
                    return {...answerObject, isSelected: true} 
                } else if (answerObject.question_id === concernedQuestionID && answerObject.isSelected){
                    return {...answerObject, isSelected: !answerObject.isSelected}
                } else {
                    return answerObject

                }
            })
        })
    }

    if (enterTheGame) { 

        return(
            <div className="app">
                {mapQuestions()}
            </div>
        )
    } else {
        return(
            <div className="app">
                <Homepage
                    play = {letsPlay}
                    prepareAnswers = {organizeAnswers}
                />
            </div>
        )
    }
}