import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Homepage from "./components/Homepage";
import Questions from "./components/Questions";
import Footer from "./components/Footer";
import Alert from "./components/Alert";
import Toggler from "./components/Toggler";

export default function App({on, toggle}) {

    const [ start, setStart] = useState(true)
                    const [ end, setEnd ] = useState(false)
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
                                return questionWithId
                            }))
                            setAnswers(allAnswers)
                            setEnd(false)
                        }
                        callAPI()
                        
                    }, [start])

    if (on) { 

        return(
            <Toggler render = {
                (alertOn, alertToggle) => {
                
                    const mapQuestions = () => {
                        return questions.map( questionObject => {
                
                            const answersOfQuestion = answers.filter(answer => answer.question_id === questionObject.id);
                
                            return (
                                <Questions
                                    question = {parseEntities(questionObject.question)}
                                    arrayAnswers ={answersOfQuestion}
                                    answerSelected = {selectAnAnswer}
                                    key = {nanoid()}
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
                
                    const checkAnswers = () => {
                        const selectedAnswers = answers
                            .filter(answer => {
                                return answer.isSelected && answer
                            })
                
                        if (selectedAnswers.length !== 5) {
                            if (!alertOn) {
                                return alertToggle()
                            }
                        } else {
                            if (alertOn) { alertToggle() }
                            ending()
                            return setAnswers(prevAnswersArray => {
                                return prevAnswersArray.map(answer => {
                                    return { ...answer, showCorrect: !answer.showCorrect}
                                })
                            })
                        }
                    }
                
                    const ending = () => {
                        return setEnd(true);
                    }
                
                    const setNewGame = () => {
                        setStart(prevGameState => {
                            return !prevGameState;
                        })
                    }
                
                    const checkCorrectAnswerNb = () => {
                        return answers.filter(answer => answer.correct && answer.isSelected)
                    }

                    return(
                        <div className="app">
                            {mapQuestions()}
                            <Alert alertOn={alertOn} />
                            <Footer
                                handleCheckAnswers = {checkAnswers}
                                endStatus = {end}
                                handleNewGame = {setNewGame}
                                goodAnswersNb = {checkCorrectAnswerNb}
                            />
                        </div>
                    )
                }
            }/>
            
        )
    } else {
        return(
                <Homepage
                    play = {toggle}
                />
        )
    }
}