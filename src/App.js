import React, { Component } from "react";
import ScoreCard from "./components/scorecard";
import Frame from "./components/frame";
import Game from "./components/game";

/**
 * Class to drive the game
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.maxFrames = 10;
    this.maxFramePins = 10;
    this.frameIntialValue = {
      firstRoll: 0,
      secondRoll: 0,
      firstRollDisabled: false,
      secondRollDisabled: true,
      secondRollMaxRange: this.maxFramePins,
    }
    // React states variables
    this.state = {
      finalScore: 0,
      frameCounter: 1,
      extraBallCount: 0,
      counters: [],
      frameValue: this.frameIntialValue,
      frameScores: [],
      gameOver: false
    };

    this.frameState = Object.freeze({
      NA: "NA",
      SPARE: "SPARE",
      STRIKE: "STRIKE"
    });

    this.lastFrameExtras = Object.freeze({
      NA: 0,
      SPARE: 1,
      STRIKE: 2
    });

    this.handleFrameSubmit = this.handleFrameSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.updatePreviousScore = this.updatePreviousScore.bind(this);
    this.handleFirstRoll = this.handleFirstRoll.bind(this);
  }

  /**
   * Function to handle submit of frame. Updates state variables and manages the frame.
   * @param {Event} click event
   */
  handleFrameSubmit = (event) => {
    event.preventDefault();
    let firstRoll = parseInt(this.state.frameValue.firstRoll);
    let secondRoll = parseInt(this.state.frameValue.secondRoll);
    let frameTotal = firstRoll + secondRoll;
    let finalScore = this.state.finalScore;
    let frameCounter = this.state.frameCounter;
    let isLastFrame = (frameCounter === this.maxFrames) ? true : false;

    let frameScore = {
      firstRoll: firstRoll,
      secondRoll: secondRoll,
      frameTotal: frameTotal
    };
    if (this.state.frameCounter <= this.maxFrames) {

      frameScore.info = this.frameState.NA;
      let extraBallCount = 0;
      if (firstRoll === this.maxFramePins) {
        frameScore.info = this.frameState.STRIKE;
        extraBallCount = isLastFrame ? this.lastFrameExtras.STRIKE : 0;
      } else if (frameTotal === this.maxFramePins) {
        frameScore.info = this.frameState.SPARE;
        extraBallCount = isLastFrame ? this.lastFrameExtras.SPARE : 0;
      }
      let gameOver = (isLastFrame && extraBallCount === 0) ? true : false;

      if (this.state.frameCounter > 1) {
        this.updatePreviousScore(frameScore, extraBallCount, gameOver);
      } else {
        this.setState((prevState) => ({
          frameCounter: prevState.frameCounter + 1,
          frameScores: [frameScore],
          finalScore: finalScore + frameScore.frameTotal,
          frameValue: this.frameIntialValue,
        }));
      }
    } else {
      let extraBallCount = this.state.extraBallCount;
      this.updatePreviousScore(frameScore, extraBallCount, true);
    }
  };

  /**
   * Function to update previous frames in case of current frame strike/spare
   * @param {Object} frameScore 
   * @param {Number} extraBallCount - On last ball strike value is 2, on spare value is 1
   * @param {gameOver} Info that game is completed
   */
  updatePreviousScore = (frameScore, extraBallCount, gameOver) => {
    let finalScore = this.state.finalScore;
    let previousScoreIndex = this.state.frameScores.length - 1;
    let previousScores = [...this.state.frameScores];
    previousScores[previousScoreIndex] = { ...previousScores[previousScoreIndex] };
    if (this.state.frameScores[previousScoreIndex].info === this.frameState.STRIKE) {
      if (this.state.frameScores.length > 1) {
        previousScores[previousScoreIndex - 1] = { ...previousScores[previousScoreIndex - 1] };
        if (this.state.frameScores[previousScoreIndex - 1].info === this.frameState.STRIKE) {
          previousScores[previousScoreIndex - 1].frameTotal = previousScores[previousScoreIndex - 1].frameTotal +
            frameScore.firstRoll;
          if (extraBallCount === 0) {
            finalScore += frameScore.firstRoll;
          }
        }
      }
      previousScores[previousScoreIndex].frameTotal += frameScore.frameTotal;
      finalScore += frameScore.frameTotal + frameScore.frameTotal;
    } else if (this.state.frameScores[previousScoreIndex].info === this.frameState.SPARE) {
      previousScores[previousScoreIndex].frameTotal += frameScore.firstRoll;
      finalScore += frameScore.firstRoll;
    } else {
      finalScore += frameScore.frameTotal;
    }

    this.setState((prevState) => ({
      ...this.state,
      extraBallCount: extraBallCount,
      frameCounter: ++prevState.frameCounter,
      frameScores: [...previousScores, frameScore],
      frameValue: { ...this.frameIntialValue },
      finalScore: finalScore,
      gameOver: gameOver,
    }), () => {
      console.log("prev ", this.state.frameScores);
    });

  };

   /**
   * Function to handle first roll. Contols the second roll pins and register the first roll score.
   * @param {Event} click event 
   */
  handleFirstRoll = (event) => {
    let firstRoll = event.target.value;
    const rollVal = {
      ...this.state.frameValue,
      firstRoll: parseInt(firstRoll),
      secondRollDisabled: ((this.state.extraBallCount === 0 && firstRoll < this.maxFramePins) ||
       (this.state.extraBallCount === this.lastFrameExtras.STRIKE)) ? false : true,
      secondRollMaxRange: (this.state.extraBallCount === 0) ? this.maxFramePins - parseInt(firstRoll) : this.maxFramePins
    };
    this.setState({ frameValue: rollVal });
  };

  /**
   * Function to handle second roll. Register the second roll score
   * @param {Event} click event 
   */
  handleSecondRoll = (event) => {
    const rollVal = {
      ...this.state.frameValue,
      firstRollDisabled: true,
      secondRoll: event.target.value
    };
    this.setState({ frameValue: rollVal });
  };

  /**
   * Function to handle restart of the game
   */
  handleRestart = () => {
    window.location.reload();
  };

  /**
   * Function to handle reset of the frame
   */
  handleReset = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      frameValue: this.frameIntialValue,
      frameCounter: prevState.frameCounter
    }));
  };

  /**
   * Buit in Function to render HTML content 
   */
  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <div className="card__box">
            <Game
              onRestart={this.handleRestart}
            />
            <ScoreCard
              totalScore={this.state.finalScore}
              frameScores={this.state.frameScores}
              frameCounter={this.state.frameCounter}
            />
            <div>
              {!this.state.gameOver ? (
                <Frame
                  frameValue={this.state.frameValue}
                  frameCounter={this.state.frameCounter}
                  extraBallCount={this.state.extraBallCount}
                  onReset={this.handleReset}
                  onFrameSubmit={this.handleFrameSubmit}
                  onFirstRoll={this.handleFirstRoll}
                  onSecondRoll={this.handleSecondRoll}
                />
              ) :
                (<span className="game-over">
                  Game Over! Your score is {this.state.finalScore}
                </span>)
              }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
