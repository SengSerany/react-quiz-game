import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Homepage from "./components/Homepage";
import Questions from "./components/Questions";

export default function App() {

    const [ enterTheGame, setEnterTheGame] = useState(false)
    const [ questions, setQuestions] = useState([])

    const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;


    const letsPlay = () => {
        setEnterTheGame(true);
    }
    
    useEffect(() => {
        const callAPI = async () => {
            const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple");
            const data = await res.json();
            setQuestions(data.results)
        }
        callAPI()
    }, [])
    
    const mapQuestions = () => {
        return questions.map( questionObject => {
            const qAnswers = [];
            qAnswers.push({value: parseEntities(questionObject.correct_answer), id: nanoid()})
            for (let i = 0; i < questionObject.incorrect_answers.length; i++) {
                console.log(questionObject.incorrect_answers)
                qAnswers.push({value: parseEntities(questionObject.incorrect_answers[i]), id: nanoid()})
            }
            qAnswers.sort()

            return (
                <Questions
                    arrayQuestionObjects = {parseEntities(questionObject.question)}
                    arrayAnswers ={qAnswers}
                    keyID = {nanoid()}
                />
            )

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
                <Homepage play={letsPlay} />
            </div>
        )
    }
}