/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './theM4thl33tz.css';
import highScorers from '../../data/seed-highScorers.json';
import aboutUs from '../../data/about-us.json';
import { findAllPoints } from '../../utils/checkAndCreate';
import LeftSideDrawer from '../../components/drawers/LeftSideDrawer';

const theM4thl33tz = props => {
  const [highScoreList, setHighScoreList] = useState([]);

  useEffect(async() => {
    const pointsList = await findAllPoints();
    await setHighScoreList(pointsList); 
  }, []);
  

  // state needed: highScorers:
  //    a munged array that holds the top 10 players and their top scores player=  
  //       {nickname: 'Bill',
  //        score: 50}... or something, use the structure that Justin Made in the game database.

  const highScorerElements = highScoreList?.map((scorer, i) => (
    <li key={`{scorer.name}-${i}`} className={styles.highScorer}>
      <div className={styles.name}>{scorer.name}</div>
      <div className={styles.points}>{scorer.points}</div>
    </li>

  ));

  return (
    <div className={styles.m4thl33tzRoom}>
      <LeftSideDrawer 
      optionsButton={false}
      aboutUsButton={true}
      />
      <ul className={styles.highScoresList}>
        {
          highScoreList.length ?
             highScorerElements
            : <div>Loading</div>
        }
      </ul>
    </div>
  );
};

theM4thl33tz.propTypes = {

};

export default theM4thl33tz;
