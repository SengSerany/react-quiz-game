export function checkCorrectAnswerNb(answers) {
    const answersSelectedAndRight = answers.filter(answer => answer.correct && answer.isSelected)
    return  answersSelectedAndRight.length;
}