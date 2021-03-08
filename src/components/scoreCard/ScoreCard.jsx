import React from 'react';
import PropTypes from 'prop-types';
import styles from './ScoreCard.css';

const ScoreCard = ({ currentScore, allTimeScore }) => {
  return (
    <div className={styles.scoresContainer}>
      <div className={styles.scoreCard}>Current: {currentScore}</div>
      <div className={styles.scoreCard}>All Time: {allTimeScore}</div>
    </div>
  );
};

ScoreCard.propTypes = {
  currentScore: PropTypes.number.isRequired,
  allTimeScore: PropTypes.number.isRequired
};

export default ScoreCard;
