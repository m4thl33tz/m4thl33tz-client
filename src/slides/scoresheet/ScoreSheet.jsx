import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from './ScoreSheet.css';
import playerScores from './../../data/seed-round-scores.json';
import { addPoints } from '../../utils/checkAndCreate';
import { useAuth0 } from '@auth0/auth0-react';

const ScoreSheet = ({ socket, players, setGameState }) => {
  const { user } = useAuth0();

  useEffect(() => {
    socket.on('DISPLAY_WINNER', setGameState);

    const { points } = players.find(p => p.userId === socket.id);

    if(user) addPoints(user.email, points);
  }, []);

  const playerScoreElements = players.map(player => (
    <li key={player.userId}>
      <span className={styles.nickname}>
        {player.nickname}
      </span>
      <span className={styles.score}>
        {player.points}
      </span>
    </li>
  ));

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
  );
};

ScoreSheet.propTypes = {

};

export default ScoreSheet;
