export function checkAnswerClass(answer) {
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