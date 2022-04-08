import React from "react";

// Stateless Functional Component

const ScoreCard = ({ totalScore, frameScores }) => {
  let frameCounter = 1;
  const frameScoreList = frameScores.map((frameScore) =>
    <li>Frame {frameCounter++} --- {frameScore.firstRoll} | {frameScore.secondRoll} 
       -- {frameScore.frameTotal}
    </li>
  );

  return (
    <div className="score-card">
      <div>
        <i className="fa fa-gamepad fa-lg m-2" aria-hidden="true" />
        Score
        <span className="badge-style badge badge-info m-2 " >
          {totalScore}
        </span>
      </div>

      <div className="frame-score">
        <ul>
          {frameScoreList}
        </ul>
      </div>

    </div>
  );
};

export default ScoreCard;
