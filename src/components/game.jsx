import React, { Component } from "react";

class Game extends Component {
  render() {
    const { onRestart } = this.props;
    return (
      <div>
        <div className='reset-pos'>
          <button className="btn btn-primary m-2" onClick={onRestart}> 
            <i className="fa fa-power-off" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }


}

export default Game;
