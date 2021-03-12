/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './WaitingRoom.css';

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
      <p key={player.userId}>{player.nickname}</p>
    );
  });

  return (
    <div className={styles.waitingRoom}>
      <header>
        <div className={styles.homeButton}>
          <a href="/choosegame">Back to Home</a>
        </div>
        <h1>M4th33tz</h1>
      </header>
      <div className={styles.waitingContent}>
        <div className={styles.waitingLeft}>
          <p>
            To join, go to sdfklnsdfkjsdf, login, make yourself a nickname, and join this room:
          </p>
          <div>
            {roomKey}
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
          <div className={styles.roster}>{roster}</div>
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
