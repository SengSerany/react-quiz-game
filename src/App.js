import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import Toggler from "./components/Toggler";
import { checkAnswers } from "./functions/checkAnswers";
import { checkCorrectAnswerNb } from "./functions/checkCorrectAnswerNb";
import { setNewGame } from "./functions/setNewGame";
import { mapQuestions } from "./functions/mapQuestions";

export default function App({inGame, inGameToggle, newCycleStatus, handleRestart, lanchNewGame}) {

    const [ gameStatus, setGameStatus] = useState(true)
    const [ questions, setQuestions] = useState([])
    const [ answers, setAnswers] = useState([])

    const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;
                                    
    useEffect(() => {

        const callAPI = async () => {
            const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple");
            const data = await res.json();
            const allAnswers = []
            setQuestions(data.results.map( questionsNoId => {
                const questionWithId = {...questionsNoId, id: nanoid()}
                                
                allAnswers.push({
                    value: parseEntities(questionWithId.correct_answer),
                    question_id: questionWithId.id,
                    id: nanoid(),
                    isSelected: false,
                    correct: true,
                    showCorrect: false
                })
                                
                for (let j = 0; j < questionWithId.incorrect_answers.length; j++) {
                    allAnswers.push({
                        value: parseEntities(questionWithId.incorrect_answers[j]),
                        question_id: questionWithId.id,
                        id: nanoid(),
                        isSelected: false,
                        correct: false,
                        showCorrect: false
                    })
                }
                lanchNewGame()
                return questionWithId
            }))

            setAnswers(allAnswers)
            
        }

        callAPI()
                        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStatus])
    
    if (inGame) { 

        return(
            <Toggler render = {
                (alertOn, alertToggle) => {
                
                    // answerSelectedID, concernedQuestionID, setAnswers

                    const nbCorrectAnswer = checkCorrectAnswerNb(answers)

                    return(
                        <div className="app">

                            {mapQuestions(questions, answers, setAnswers, parseEntities)}
                            <Alert alertOn={alertOn} />
                            <Footer
                                handleCheckAnswers = {() => {checkAnswers(answers, alertOn, alertToggle, setAnswers, handleRestart)}}
                                endStatus = {newCycleStatus}
                                handleNewGame = {() => {setNewGame(setGameStatus)}}
                                goodAnswersNb = {nbCorrectAnswer}
                            />
                        </div>
                    )
                }
            } />
        )

    } else {
        return(
                <Homepage
                    play = {inGameToggle}
                />
        )
    }
}