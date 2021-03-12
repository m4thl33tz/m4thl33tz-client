/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './WaitingRoom.css';
import Anime from 'react-anime';

const WaitingRoom = ({ socket, roomKey, setGameState, players, isHost, difficulty, setDifficulty }) => {
  // Handlers
  const startGame = () => {
    socket.emit('START_GAME', roomKey);
  };

  const updateDifficulty = event => {
    event.preventDefault();

    setDifficulty(event.target.value);
  };

  // Socket Listeners
  useEffect(() =>  {
    socket.on('START_GAME_RESULTS', setGameState);
  }, []);

  const isInitialMount = useRef(true);

  useEffect(() => {
    // Only send updated difficulty to the BE after mount
    if(isInitialMount.current) {
      isInitialMount.current = false;
    }
    else {
      socket.emit('GAME_OPTIONS', { difficulty, roomKey });
    }
  }, [difficulty]);

  // List of players
  const roster = players.map(player => {
    return (
      <p key={player.userId}
        className={styles.name}>
        {player.nickname}
      </p>
    );
  });

  //Wrapper for title animation
  const header = 'the W41ting R00m'
  const wrappedHeaderLetters = [...header].map((char, i) => (
    <span key={i} className={styles.letter}>{char}</span>
  ));

  // Wrapper for roomKey animation
  const dancingRoomKey = [...roomKey].map((char, i) => (
    <span key={i} className={styles.letter}>{char}</span>
  ));

  return (
    <div className={styles.waitingRoom}>
      <header className={styles.header}>
        <div className={styles.homeButton}>
          <a className={styles.myLink} href="/choosegame">Back to Home</a>
        </div>
        <div className={styles.title}>
          <Anime
            loop={true}
            scale={[1.12, 1.13]}
            rotate={[(el) => Math.random() * 9 - 6,
              (el) => Math.random() * 9 - 2]}
            translateY={[0, (el) => Math.random() * 6 - 2 ]}
            easing="easeInOutQuad"
            direction="alternate"
            duration={690}
          >
            {wrappedHeaderLetters}
          </Anime>
        </div>
      </header>
      <div className={styles.waitingContent}>
        <div className={styles.waitingLeft}>
          <p>
            To join, go to <strong>www.m4thl33tz.netlify.com</strong>, login, make yourself a nickname, and join this room:
          </p>
          <div className={styles.roomKey}>
            <Anime
              loop={true}
              scale={[1.12, 1.13]}
              rotate={[(el) => Math.random() * 9 - 4,
                (el) => Math.random() * 9 + 1]}
              translateZ={[[(el) => Math.random() * 9 - 6,
                (el) => Math.random() * 9 - 2]]}  
              easing="easeInOutQuad"
              direction="alternate"
              duration={690}
            >
              {dancingRoomKey}
            </Anime>
          </div>
          <div className={styles.joinRoomInfo}></div>
          <div className={styles.waitingRoomOptions}>
            <form
              style={{ visibility: isHost ? 'visible' : 'hidden' }}
              onChange={updateDifficulty}
            >
              <label htmlFor="difficulty">Difficulty: </label>
              <select 
                id="difficulty" 
                defaultValue="easy"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </form>
          </div>
        </div>
        <div className={styles.waitingRight}>
          <div className={styles.roster}>
            <Anime
              loop={true}
              scale={[1.12, 1.13]}
              rotate={[(el) => Math.random() * 1 - .5,
                (el) => Math.random() * 1 + .5]}
              translateX={[[(el) => Math.random() * 30 - 15,
                (el) => Math.random() * 30 - 15]]}  
              easing="easeInOutExpo"
              direction="alternate"
              duration={690}
            >
              {roster}
            </Anime>
          </div>
          <button
            style={{ visibility: isHost ? 'visible' : 'hidden' }}
            onClick={startGame}>
              Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

WaitingRoom.propTypes = {

};

export default WaitingRoom;
