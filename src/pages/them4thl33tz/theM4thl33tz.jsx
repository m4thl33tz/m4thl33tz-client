/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import styles from './theM4thl33tz.css';
// import highScoreList from '../../data/seed-highScorers.json';
import aboutUs from '../../data/about-us.json';
import { findAllPoints } from '../../utils/checkAndCreate';
import Anime from 'react-anime';
import LeftSideDrawer from '../../components/drawers/LeftSideDrawer';
import video from '../../assets/approaching_equations_long.mp4';

const theM4thl33tz = () => {
  const [highScoreList, setHighScoreList] = useState([]);

  useEffect(async() => {
    const pointsList = await findAllPoints();
    await setHighScoreList(pointsList); 
  }, []);
  

// THE DEV ONE
  // const highScorerElements = highScoreList?.map((scorer, i) => (
  //   <li key={`{scorer.name}-${i}`} className={styles.highScorer}>
  //     <div className={styles.name}>{scorer.name}</div>
  //     <div className={styles.points}>{scorer.points}</div>
  //   </li>

// THE REAL ONE

  const highScorerElements = highScoreList?.map((scorer, i) => (
    <li key={`{scorer.name}-${i}`} className={styles.highScorer}>
      <div className={styles.name}>{scorer.name}</div>
      <div className={styles.points}>{scorer.points}</div>
    </li>

  ));



  return (
    <div className={styles.m4thl33tzRoom}>
      <div className={styles.drawerContainer}>
      <LeftSideDrawer 
      optionsButton={false}
      aboutUsButton={true}
      />
      </div>
      <video className={styles.backgroundVideo} autoPlay muted loop>
        <source src={video}
          type="video/mp4"></source>
      </video>
      
      <h1 className={styles.title}>m33t the m4thl33tz!!</h1>
      <ul className={styles.highScoresList}>
        {
          highScoreList.length ?
          <Anime
          loop={false}
          scale={[0, 1.1]}
          opacity={[0, 1]}
          rotate={
            [(el) => Math.random()* 60 - 30,
              0]}
          translateX={[0, 0]}
          translateY={[-20, 0]}
          translateZ={0}
          easing="easeOutElastic"
          duration={800}
          delay={(el, i) => 70 * i + 500} 
        >
          {highScorerElements}
        </Anime>
            : <div>Loading</div>
        }
      </ul>
    </div>
  );
};

export default theM4thl33tz;
