import React, { Component } from "react";
const setAnswersContext = React.createContext()

class SetAnswersProvider extends Component {

    render () {
        return (
            <setAnswersContext.Provider value={this.props.value}>
                { this.props.children }
            </setAnswersContext.Provider>
        )
    }
    
}

export { SetAnswersProvider, setAnswersContext }