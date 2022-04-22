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

    const mapAnswers = () => {
        return answersSort.map( answer => {
            return (
                <div
                    key={answer.id}
                    id={answer.id}
                    className={answer.isSelected ? "answer selected" : "answer"}
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