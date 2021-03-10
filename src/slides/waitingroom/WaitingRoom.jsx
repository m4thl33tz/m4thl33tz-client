/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './WaitingRoom.css';

const WaitingRoom = ({ socket, roomKey, setGameState, players, isHost }) => {
  // Waiting Room State
  const [gameOptions, setGameOptions] = useState({
    operand: 'arithmetic',
    operator: 'addition',
    difficulty: 'easy'
  });

  // Handlers
  const startGame = () => {
    socket.emit('START_GAME', roomKey);
  };

  const updateOptions = event => {
    event.preventDefault();

    setGameOptions(gameOptions => ({
      ...gameOptions,
      [event.target.id]: event.target.value
    }));
  };

  // Send updated game options to the back end
  useEffect(() => {
    if(socket) socket.emit('GAME_OPTIONS', { ...gameOptions, roomKey });
  }, [gameOptions]);

  // socket listeners
  if(socket) {
    socket.on('START_GAME_RESULTS', setGameState);
  }

  const roster = players.map(player => {
    return (
      <p key={player.userId}>{player.nickname}</p>
    );
  });

  return (
  // Wrapped in the  game room
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
              onChange={updateOptions}
            >

              <label htmlFor="operand">Operand: </label>
              <select
                id="operand"
                defaultValue="arithmetic"
              >
                <option value="arithmetic">Arithmetic</option>
              </select>

              <label htmlFor="operator">Operator: </label>
              <select 
                id="operator" 
                defaultValue="addition"
              >
                <option value="addition">Addition</option>
                <option value="multiplication">Multiplication</option>
                <option value="subtraction">Subtraction</option>
                <option value="division">Division</option>
              </select>
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

}

export default WaitingRoom;
