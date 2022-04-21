import React, { useEffect, useState } from "react";
import Homepage from "./components/Homepage";
import Quiz from "./components/Quiz";

export default function App() {

    const [ enterTheGame, setEnterTheGame] = useState(false)
    const [ questions, setQuestions] = useState([])


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

    const arrayAnswers = ["yes", "No", "Maybe", "Dunno"]
    if (enterTheGame) { 

        return(
            <div className="app">
                <Quiz
                    arrayQuestionObjects = {questions}
                    arrayAnswers ={arrayAnswers}
                />
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