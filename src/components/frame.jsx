import React, { Component } from "react";

/**
 * Class to render Frames of the game
 */
class Frame extends Component {

  render() {
    const { onFirstRoll, onSecondRoll, frameCounter, frameValue, extraBallCount, onFrameSubmit, onReset } = this.props;
    const hasExtraBall = extraBallCount > 0 ? true : false;
    const ballType = hasExtraBall ? "Extra-ball" : "ball";
    return (
      <div className="frame-group">
        <span className="badge-style badge badge-info">
          {!hasExtraBall ? (<span>Frame &nbsp; {frameCounter} &nbsp;</span>) : 
          (<span> Extra Ball &nbsp; {extraBallCount} &nbsp;</span>)}
        </span>

        <form onSubmit={onFrameSubmit}>
          <div className="form-group">
            <label htmlFor="new-todo"> Enter {ballType}-1 score: </label>
            <input id="firstRoll" className="form-input" value={frameValue.firstRoll} type="number"
              disabled={frameValue.firstRollDisabled} min="0" max="10" onChange={onFirstRoll}
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-todo"> Enter {ballType}-2 score: </label>
            <input id="secondRoll" className="form-input" value={frameValue.secondRoll}
              disabled={frameValue.secondRollDisabled} type="number" min="0" max={frameValue.secondRollMaxRange} onChange={onSecondRoll}
            />
          </div>
          <button className="btn btn-success m-2">
          <i className="fa fa-check" aria-hidden="true" />
           &nbsp; Submit frame #{frameCounter}
          </button>
          <button className="btn btn-success m-2" 
            onClick={onReset}> 
            <i className="fa fa-refresh" aria-hidden="true" />
            &nbsp; Reset
          </button>
        </form>
      </div>
    );
  }
}

export default Frame;
