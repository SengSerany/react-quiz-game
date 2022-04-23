import React from "react";

export default function Answers({arrayAnswers, answerSelected}) {

    const compare = ( firstElement, secondElement) => {
        if ( firstElement.value < secondElement.value ){
          return -1;
        }
        if ( firstElement.value > secondElement.value ){
          return 1;
        }
        return 0;
      }
      
    const answersSort = arrayAnswers.sort( compare );

    const checkAnswer = (answer) => {
        if (answer.showCorrect){
            if (answer.correct && answer.isSelected) {
                    return "answer check-right";
            } else if (answer.correct && !answer.isSelected) {
                    return "answer check-right";
            } else if (!answer.correct && answer.isSelected) {
                    return "answer check-wrong";
            } else if (!answer.correct && !answer.isSelected) {
                    return "answer check";
            }
        } else {
            if (answer.isSelected) {
                return "answer selected"
            } else {
                return "answer"
            }
        }
    }


    const mapAnswers = () => {
        return answersSort.map( answer => {
            return (
                <div
                    key={answer.id}
                    id={answer.id}
                    className={checkAnswer(answer)}
                    onClick={() => answerSelected(answer.id, answer.question_id)}>
                        {answer.value}
                    </div>
                )
        })
    }

    return(
        <div className="answers">
                {mapAnswers()}
        </div>
    )
}