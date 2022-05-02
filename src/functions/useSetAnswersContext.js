import React from "react";
const setAnswersContext = React.createContext()

function SetAnswersProvider(props) {
    return (
        <setAnswersContext.Provider value={props.value}>
            { props.children }
        </setAnswersContext.Provider>
    )
}

export { SetAnswersProvider, setAnswersContext }