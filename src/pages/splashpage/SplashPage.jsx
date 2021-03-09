import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { checkAndCreate } from '../../utils/checkAndCreate';
import styles from './SplashPage.css';
import Anime from 'react-anime';

const SplashPage = () => {
  //this is grabbing the info we need from  auth0
  const { loginWithPopup, user, logout } = useAuth0();

  // after the user logs in or signs up with AUTH0 the useEffect
  // runs and checks to see if the user has data in the server
  //if not the info from AUTh0 is use to create a user's info.
  useEffect(() => {
    if (user) checkAndCreate(user);
  }, [user]);

  const buttonPhrase = 'm4thl33tz';
  const leavePhrase = 'Why doncha\' L0g Out';


  // spreads the phrase and wrapps each char in a span
  const wrappedWelcomeLetters = [...buttonPhrase].map((char, i) => (
    <span key={i} className="letter">{char}</span>
));

  const wrappedLogoutLetters = [...leavePhrase].map((char, i) => (
    <span key={i} className="letter">{char}</span>
));

  return (
    <div className={styles.splashContainer}>
      <div className={styles.backgroundOne}></div>
      <div className={styles.backgroundTwo}></div>

      <div 
        className={styles.button}
        onClick={() => loginWithPopup()}>
        <Anime
          loop={false}
          scale={[4, 1]}
          opacity={[0, 1]}
          rotate={[5, (el) => Math.random()* 6 - 3]}
          translateX={[-300, 0]}
          translateY={[(el) => Math.random() * 200 - 150, 0]}
          translateZ={0}
          easing="easeOutBounce"
          duration={1000}
          delay={(el, i) => 
            (1000 + (-40*i) + (40*wrappedWelcomeLetters.length))} 
        >
          {wrappedWelcomeLetters}
        </Anime>
      </div>
      <div 
        className={styles.buttontwo}
        onClick={() => logout()}>
        <Anime
          loop={false}
          scale={[1.3, 1]}
          opacity={[0, 1]}
          rotate={[-4, (el) => Math.random()* 6 - 3]}
          translateX={[150, 0]}
          translateY={[(el) => Math.random() * 50 - 25, 0]}
          translateZ={0}
          easing="easeOutBounce"
          duration={600}
          delay={(el, i) => (3000 + 30*i)} 
        >
          {wrappedLogoutLetters}
        </Anime>
      </div>
    </div>
  )
}

export default SplashPage
