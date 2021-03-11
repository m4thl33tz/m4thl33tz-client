import React from 'react';
import styles from './R_One_TitleCard.css';
import Anime from 'react-anime';


const CongratsCard = ({ socket, setGameState }) => {

  // const winner = the person withthe most points

  const text = 'Our m4thl33t is';
  const winner = 'Ryan Mehta';

  const wrappedTitleLetters = [...text].map((char, i) => (
    <span key={i} className={styles.letter}>{char}</span>
  ));

  const wrappedWinnerLetters = [...winner].map((char, i) => (
    <span key={i} className={styles.letter}>{char}</span>
  ));

  if(socket) {
    socket.on('ROUND_ONE', setGameState);
  }

  return (
 
    <div className={styles.titleCard}>
      <div className={styles.titleBackground}></div>
      <div className={styles.title}>
        <Anime
          loop={false}
          scale={[0, 1.2]}
          opacity={[.5, 1]}
          rotate={[(el) => Math.random()* 360 - 180,
            (el) => Math.random()* 8 - 4]}
          translateX={[0, 0]}
          translateY={[(el) => Math.random() * 100 - 100, 0]}
          translateZ={0}
          easing="easeOutElastic"
          duration={1500}
          delay={(el, i) => (70*i)} 
        >
          {wrappedTitleLetters}
        </Anime>
      </div>
      <div className={styles.round}>
        <Anime
          loop={false}
          scale={[6, 1.1]}
          opacity={[0, 1]}
          rotate={
            [(el) => Math.random()* 30 - 10,
              (el) => Math.random()* 10 - 5]}
          translateX={[0, 0]}
          translateY={[(el) => Math.random() * 100 - 60, 0]}
          translateZ={0}
          easing="easeOutElastic"
          duration={700}
          delay={2000} 
        >
          {wrappedWinnerLetters}
        </Anime>
      </div>
    </div>
  )
}

export default CongratsCard
