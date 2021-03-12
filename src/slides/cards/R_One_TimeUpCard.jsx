import React, { useEffect } from 'react';
import styles from './R_One_TimeUpCard.css';
import Anime from 'react-anime';



const TimeUp = ({ socket, setGameState }) => {

  useEffect(() => {
    socket.on('GAME_OVER', setGameState);
  }, []);

  const text = 'Time\'s UP!!';

  const wrappedTimeUpLetters = [...text].map((char, i) => (
    <span key={i} className={styles.letter}>{char}</span>
  ));

  return (
 
    <div className={styles.timeUpCard}>
      <video className={styles.backgroundVideo} autoPlay muted loop
      >
        <source src="./src/assets/approaching_equations.mp4"
          type="video/mp4"></source>
      </video> 
        
      <div className={styles.timeUp}>
        <Anime
          loop={false}
          scale={[0, 13]}
          opacity={[1,1, 1, 0]}
          rotate={0}
          translateX={[0, (el, i) => -(text.length)* 20 + (40*i)]}
          translateY={0}
          translateZ={0}
          easing="easeInSine"
          duration={3000}
          delay={0} 
        >
          {wrappedTimeUpLetters}
        </Anime>
      </div>
    </div>
  )
}

export default TimeUp
