import React, { Component } from "react";
import ScoreCard from "./components/scorecard";
import Frame from "./components/frame";
import Game from "./components/game";



class App extends Component {
  constructor(props) {
    super(props);

    this.frameIntialValue = {
      firstRoll: 0,
      secondRoll: 0,
      firstRollDisabled: false,
      secondRollDisabled: true,
      secondRollMaxRange: 10,
    }

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

    this.maxFrames = 10;
    this.maxFramePins = 10;

    this.handleFrameSubmit = this.handleFrameSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.updatePreviousScore = this.updatePreviousScore.bind(this);
    this.handleFirstRoll = this.handleFirstRoll.bind(this);
  }

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

      let frameInfo = this.frameState.NA;
      let extraBallCount = 0;
      if (firstRoll === this.maxFramePins) {
        frameInfo = this.frameState.STRIKE;
        extraBallCount = isLastFrame ? this.lastFrameExtras.STRIKE : 0;
      } else if (frameTotal === this.maxFramePins) {
        frameInfo = this.frameState.SPARE;
        extraBallCount = isLastFrame ? this.lastFrameExtras.SPARE : 0;
      }
      frameScore.info = frameInfo;
      let gameOver = (this.state.frameCounter === this.maxFrames && extraBallCount === 0) ? true : false;

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

  handleFirstRoll = (event) => {
    let firstRoll = event.target.value;
    const rollVal = {
      ...this.state.frameValue,
      firstRoll: parseInt(firstRoll),
      secondRollDisabled: ((this.state.extraBallCount === 0 && firstRoll < 10) || (this.state.extraBallCount === 2)) ? false : true,
      secondRollMaxRange: (this.state.extraBallCount === 0) ? 10 - parseInt(firstRoll) : 10
    };
    this.setState({ frameValue: rollVal });
  };

  handleSecondRoll = (event) => {
    const rollVal = {
      ...this.state.frameValue,
      firstRollDisabled: true,
      secondRoll: event.target.value
    };
    this.setState({ frameValue: rollVal });
  };

  handleRestart = () => {
    window.location.reload();
  };

  handleReset = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      frameValue: this.frameIntialValue,
      frameCounter: prevState.frameCounter
    }));
  };

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
