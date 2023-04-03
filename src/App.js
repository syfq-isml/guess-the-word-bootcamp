import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

function isAllLetters(inputtxt) {
    var letters = /^[A-Za-z]+$/;
    if (inputtxt.match(letters)) return true;
    return false;
}

class App extends React.Component {
    constructor(props) {
        // Always call super with props in constructor to initialise parent class
        super(props);
        this.state = {
            // currWord is the current secret word for this round. Update this with this.setState after each round.
            currWord: getRandomWord(),
            // guessedLetters stores all letters a user has guessed so far
            guessedLetters: [],

            correctGuesses: 0,

            guessesLeft: 6,
            guessInput: "",
            error: false,
            errorMsg: "",
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
        return {
            wordWithSpace: wordDisplay.join(" "),
            wordWithoutSpace: wordDisplay.join(""),
        };
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let input = e.target[0].value;

        // check for duplicates => YES? show error and end prematurely
        if (this.state.guessedLetters.indexOf(input) !== -1) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    error: true,
                    errorMsg: "You typed in a duplicate",
                };
            });
            return;
        }

        // check for non-alphabets => YES? show error and
        if (!isAllLetters(input)) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    error: true,
                    errorMsg: "Only alphabets pls",
                };
            });
            return;
        }

        this.setState((prevState) => {
            // check if guess is correct => YES? update guessedLetters array, reset input field, DONT decrease guessesLeft
            if (prevState.currWord.includes(prevState.guessInput)) {
                return {
                    ...prevState,
                    guessedLetters: [
                        ...prevState.guessedLetters,
                        prevState.guessInput,
                    ],
                    guessInput: "",
                };
            }

            // check if guess is correct => NO? update guessedLetters array, reset input field, decrease guessesLeft
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

            // check if length of input > 1 => YES? show error message
            if (input.length > 1) {
                return {
                    ...prevState,
                    error: true,
                    errorMsg: "Only 1 character pls",
                };
            }

            // check if length of input > 1 => NO? update form states
            return {
                ...prevState,
                guessInput: e.target.value,
                error: false,
            };
        });
    };

    render() {
        let { wordWithSpace, wordWithoutSpace } = this.generateWordDisplay();

        let gameResult;
        if (wordWithoutSpace === this.state.currWord) gameResult = "win";
        else if (this.state.guessesLeft === 0) gameResult = "lose";

        return (
            <div className="App">
                <header className="App-header">
                    <h1>Guess The Word 🚀</h1>
                    <h3>Word Display</h3>
                    {wordWithSpace}
                    <h3>Guessed Letters</h3>
                    {this.state.guessedLetters.length > 0
                        ? this.state.guessedLetters.join(", ")
                        : "-"}
                    <h3>Input</h3>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <input
                            required
                            name="guessInput"
                            value={this.state.guessInput}
                            onChange={this.handleChange}
                            disabled={
                                gameResult === "lose"
                                    ? true
                                    : gameResult === "win"
                                    ? true
                                    : false
                            }
                        />
                        <button
                            type="submit"
                            disabled={
                                gameResult === "lose"
                                    ? true
                                    : gameResult === "win"
                                    ? true
                                    : false
                            }
                        >
                            Guess!
                        </button>
                        {this.state.error && <h3>{this.state.errorMsg}</h3>}
                        {gameResult === "lose" && <h3>Game over...</h3>}
                        {gameResult === "win" && <h3>You win!</h3>}
                    </form>
                </header>
            </div>
        );
    }
}

export default App;
