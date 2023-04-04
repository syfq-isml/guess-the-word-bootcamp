import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";

class GuessedLetters extends Component {
    render() {
        return (
            <Grid item xs={4}>
                <Paper>
                    <h3>Guessed Letters</h3>
                    {this.props.guessedLetters.length > 0
                        ? this.props.guessedLetters.join(", ")
                        : "-"}
                </Paper>
            </Grid>
        );
    }
}

export default GuessedLetters;
