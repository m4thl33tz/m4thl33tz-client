import React from 'react'
import PropTypes from 'prop-types';
import styles from './ScoreSheet.css';
import playerScores from './../../data/seed-round-scores.json';

const ScoreSheet = props => {
//   state needed: 
//       all player nicknames
//      all players round scores
//     all player current game scores 
//     all player updated game scores --> added up here? updated via setTimeout?
//     current round number

  
  //  const score = () => {
  //    this function takes the current game score, for 3 seconds
  //   then adds the round score to the current score
  //   needs to be displaying this dynamically 
  //  }

  const playerScoreElements = playerScores.map((score, i) => (

    <li key={`${score.nickname}-${i}`}>
      <span className={styles.nickname}>
        {score.nickname}
      </span>
      <span className={styles.score}>
        {score.score}
      </span>
    </li>
  ))

  // list items can be destructured later into seperate list items...
  // although if we use a chart, it will not be destructured
  return (
    <div className={styles.scoreSheetContainer}>
      <div className={styles.title}>
        <h1>Scores for </h1>
        <h1> Round 1</h1>
      </div>
      <div className={styles.scoreChart}>
        <ul>
          {playerScoreElements}
        </ul>
      </div>
    </div>
  )
}

ScoreSheet.propTypes = {

}

export default ScoreSheet
