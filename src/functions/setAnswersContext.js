import React, { Component } from "react";
const { Provider, Consumer } = React.createContext()

class SetAnswersProvider extends Component {

    render () {
        return (
            <Provider value={this.props.value}>
                { this.props.children }
            </Provider>
        )
    }
    
}

export { SetAnswersProvider, Consumer as SetAnswersConsumer }