import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";

class GuessForm extends Component {
    render() {
        return (
            <Grid item xs={12}>
                <Paper>
                    <form autoComplete="off" onSubmit={this.props.handleSubmit}>
                        <input
                            required
                            name="guessInput"
                            value={this.props.guessInput}
                            onChange={this.props.handleChange}
                            disabled={
                                this.props.gameResult === "lose"
                                    ? true
                                    : this.props.gameResult === "win"
                                    ? true
                                    : false
                            }
                        />
                        <button
                            type="submit"
                            disabled={
                                this.props.gameResult === "lose"
                                    ? true
                                    : this.props.gameResult === "win"
                                    ? true
                                    : false
                            }
                        >
                            Guess!
                        </button>
                        {this.props.error && <h3>{this.props.errorMsg}</h3>}
                        {this.props.gameResult === "lose" && (
                            <h3>Game over...</h3>
                        )}
                        {this.props.gameResult === "win" && <h3>You win!</h3>}
                    </form>
                </Paper>
            </Grid>
        );
    }
}

export default GuessForm;
