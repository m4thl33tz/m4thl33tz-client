import React,  { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './ChooseGame.css';

const ChooseGame = ({ socket }) => {
  const history = useHistory();

  const [roomKey, setRoomKey] = useState('');
  const [nickname, setNickname] = useState('');

  const toAcademicRoom = () => {
    alert('You will be redirected to the Academic Room');
  };
  const createRoom = () => {
    socket.emit('CREATE_ROOM', { nickname });
    
    
    //socket stuff that makes a room and returns the name of the code
    // history.push(/gameroom/${roomKey})
    history.push('/gameroom');
  };

  const joinRoom = () => {
    alert(`You will be JOINING Game Room: ${roomKey}`);
  };

  return (

    <div className={styles.chooseGameContainer}>
      <section>
        <div className={styles.academicCard}>
          <button 
            onClick={toAcademicRoom}>
            click me to go to the adcademic Room
          </button>
        </div>
      </section>
      <section>
        <div className={styles.competitiveCard}>
          <h2>How about a friendly mAthl33tz Competition</h2>
          <div className={styles.nickname}>
            <label htmlFor="nickname">Give Yourself a Nickname</label>
            <input 
              name="nickname"
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder="What's ya name?" />
          </div>
        </div>
        <div className={styles.createRoom}>
          <h3>Create your own Game</h3>
          <button 
            onClick={createRoom}>
              click me to create a new Game
          </button>
        </div>
        <div className={styles.joinRoom}>
          <label htmlFor="join-room">Join a Game Room</label>
          <input 
            name="join-room"
            type="text"
            value={roomKey}
            onChange={e => setRoomKey(e.target.value)}
            placeholder="Enter Room Code Here" />
          <button 
            onClick={joinRoom}>
              click me to to join a Room
          </button>
        </div>
      </section>
    </div>
  );
}

export default ChooseGame;
