export function setNewGame(setGameStatus) {
    setGameStatus(prevGameState => {
        return !prevGameState;
    })
}