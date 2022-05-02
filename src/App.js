import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { checkAnswers } from "./functions/useCheckAnswers";
import { checkCorrectAnswerNb } from "./functions/useCheckCorrectAnswerNb";
import { setNewGame } from "./functions/useSetNewGame";
import { mapQuestions } from "./functions/useMapQuestions";
import { SetAnswersProvider } from "./functions/useSetAnswersContext";

import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import Toggler from "./components/Toggler";

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

                    const nbCorrectAnswer = checkCorrectAnswerNb(answers)

                    return(
                        <div className="app">
                            <SetAnswersProvider value={setAnswers}>
                                {mapQuestions(questions, answers, parseEntities)}
                            </SetAnswersProvider>
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