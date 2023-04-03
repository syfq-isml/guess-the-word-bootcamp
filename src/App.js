import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        // Always call super with props in constructor to initialise parent class
        super(props);
        this.state = {
            // currWord is the current secret word for this round. Update this with this.setState after each round.
            currWord: getRandomWord(),
            // guessedLetters stores all letters a user has guessed so far
            guessedLetters: [],

            guessesLeft: 10,
            guessInput: "",
            error: false,
        };
    }

    generateWordDisplay = () => {
        const wordDisplay = [];
        // for...of is a string and array iterator that does not use index
        for (let letter of this.state.currWord) {
            if (this.state.guessedLetters.includes(letter)) {
                wordDisplay.push(letter);
            } else {
                wordDisplay.push("_");
            }
        }
        return wordDisplay.toString();
    };

    // Insert form callback functions handleChange and handleSubmit here

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState((prevState) => {
            return {
                ...prevState,
                guessedLetters: [
                    ...prevState.guessedLetters,
                    prevState.guessInput,
                ],
                guessInput: "",
                guessesLeft: prevState.guessesLeft - 1,
            };
        });
    };

    handleChange = (e) => {
        this.setState((prevState) => {
            let input = e.target.value;
            if (input.length > 1) {
                return {
                    ...prevState,
                    error: true,
                };
            } else {
                return {
                    ...prevState,
                    guessInput: e.target.value,
                    error: false,
                };
            }
        });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Guess The Word 🚀</h1>
                    <h3>Word Display</h3>
                    {this.generateWordDisplay()}
                    <h3>Guessed Letters</h3>
                    {this.state.guessedLetters.length > 0
                        ? this.state.guessedLetters.toString()
                        : "-"}
                    <h3>Input</h3>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            name="guessInput"
                            value={this.state.guessInput}
                            onChange={this.handleChange}
                        />
                        <button type="submit">Guess!</button>
                        {this.state.error && <h3>Bro pls....</h3>}
                    </form>
                </header>
            </div>
        );
    }
}

export default App;
