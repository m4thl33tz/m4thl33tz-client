/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './theM4thl33tz.css';
import highScorers from '../../data/seed-highScorers.json';
import aboutUs from '../../data/about-us.json';

const theM4thl33tz = props => {
  // state needed: highScorers:
  //    a munged array that holds the top 10 players and their top scores player=  
  //       {nickname: 'Bill',
  //        score: 50}... or something, use the structure that Justin Made in the game database.

  const highScorerElements = highScorers.map((scorer, i) => (
    <li key={`{scorer.nickname}-${i}`} className={styles.highScorer}>
      <div className={styles.nickname}>{scorer.nickname}</div>
      <div className={styles.score}>{scorer.score}</div>
    </li>

  ));

  return (
    <div className={styles.m4thl33tzRoom}>
      <ul className={styles.highScoresList}>
        {highScorerElements}
      </ul>
    </div>
  );
};

theM4thl33tz.propTypes = {

};

export default theM4thl33tz;
