export function checkAnswers(answers, alertOn, alertToggle, setAnswers, handleRestart) {
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
        handleRestart()
        return setAnswers(prevAnswersArray => {
            return prevAnswersArray.map(answer => {
                return { ...answer, showCorrect: !answer.showCorrect}
            })
        })
    }
}