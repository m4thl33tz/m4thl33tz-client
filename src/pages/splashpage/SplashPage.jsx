import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayer } from '../../actions/userActions';
import { getUser } from '../../selectors/userSelector';
import { useAuth0 } from '@auth0/auth0-react';
import { addNewPoints, checkUser, addPlayer } from '../../utils/checkAndCreate';
import styles from './SplashPage.css';
import Anime from 'react-anime';



const SplashPage = () => {
  const [loading, setLoading] = useState(true)


  const history = useHistory();

  //this is grabbing the info we need from  auth0
  const { loginWithPopup, user, isAuthenticated } = useAuth0();
  //possibly remove (REDUX)
  const dispatch = useDispatch();

  // after the user logs in or signs up with AUTH0 the useEffect
  // runs and checks to see if the user has data in the server
  //if not the info from AUTh0 is use to create a user's info.
  useEffect(async() => {
    if (user) {
  
      const isUser = await checkUser(user);
      if(!isUser) {
        await addPlayer(user);
        await addNewPoints(user);
      } return;
    }
  }, [user]);

  useEffect(() => {
    setTimeout(setLoading(false), 6000);
  }, []);

  // possibly remove
  const currentUser = useSelector(getUser) || {};

  

  const m4thPhraseOne = 'm4thl33te';
  const readyPhrase = 'Are you Ready to be a';
  const getStarted = 'let\'s get started';


  // spreads the phrase and wraps each char in a span
  const wrappedWelcomeLetters = [...m4thPhraseOne].map((char, i) => (
    <span key={i} className={styles.letter}>{char}</span>
  ));

  const wrappedReadyLetters = [...readyPhrase].map((char, i) => (
    <span key={i} className={styles.letter}>{char}</span>
  ));

  const wrappedGetStarted = [...getStarted].map((char, i) => (
    <span key={i} className={styles.letter}>{char}</span>
  ));

  if (loading) {
    return (
      <div>loading!!!!!!!</div> 
    )
  } if (!isAuthenticated && !loading) {
    return (
      <div className={styles.splashContainer}>
        <video className={styles.backgroundVideo} autoPlay muted loop>
          <source src="./src/assets/approaching_equations.mp4"
            type="video/mp4"></source>
        </video> 
        <div className={styles.backgroundOne}></div>
        <div className={styles.backgroundTwo}></div>
        <div className={styles.areYouReady}>
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
            delay={(el, i) => (30*i)} 
          >
            {wrappedReadyLetters}
          </Anime>
        </div>
        <div 
          className={styles.m4thl33teOne}
          onClick={() => loginWithPopup()}>
          <Anime
            loop={false}
            scale={[4, 1.15]}
            opacity={[0, 1]}
            rotate={[5, (el) => Math.random()* 6 - 3]}
            translateX={[0, 0]}
            translateY={[(el) => Math.random() * 200 - 150, 0]}
            translateZ={0}
            easing="easeOutBounce"
            duration={400}
            delay={(el, i) => 
              (3000 + (-40*i) + (40*wrappedWelcomeLetters.length))} 
          >
            {wrappedWelcomeLetters}
          </Anime>
        </div>

      </div>
    )
           
  } if (!loading && isAuthenticated) return (
    <div className={styles.splashContainer}>
      <video className={styles.backgroundVideo} autoPlay muted loop>
        <source src="./src/assets/approaching_equations.mp4"
          type="video/mp4"></source>
      </video> 
      <div className={styles.backgroundOne}></div>
      <div className={styles.backgroundTwo}></div>
      <div className={styles.getStarted}>
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
          delay={(el, i) => (30*i)} 
        >
          {wrappedGetStarted}
        </Anime>
      </div>
      <div 
        className={styles.m4thl33teOne}
        onClick={() => history.push("/choosegame")}

      >
        <Anime
          loop={false}
          scale={[4, 1.15]}
          opacity={[0, 1]}
          rotate={[5, (el) => Math.random()* 6 - 3]}
          translateX={[0, 0]}
          translateY={[(el) => Math.random() * 200 - 150, 0]}
          translateZ={0}
          easing="easeOutBounce"
          duration={400}
          delay={(el, i) => 
            (2000 + (-40*i) + (40*wrappedWelcomeLetters.length))} 
        >
          {wrappedWelcomeLetters}
        </Anime>
      </div>

    </div>
  )
};

{/* 
const WriggleWrap = ({item}) => {
  return (
  <Anime
    loop={true}
    rotate={[(el) => Math.random()* 2 - 1,  (el) => Math.random()* 2 - 1]}
    easing='easeInOutSine'
    direction='alternate'
    duration={800}
    delay={3500}
  >
  </Anime>
  )
} */}

export default SplashPage