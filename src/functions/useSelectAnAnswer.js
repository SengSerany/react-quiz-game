export function selectAnAnswer(answerSelectedID, concernedQuestionID, setAnswers){
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