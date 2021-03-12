import React,  { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './ChooseGame.css';
import LeftSideDrawer from '../../components/drawers/LeftSideDrawer';

const ChooseGame = ({ socket }) => {
  const history = useHistory();
  const { user } = useAuth0();
  const [roomKey, setRoomKey] = useState('');
  const [nickname, setNickname] = useState('M4thl33t');

  useEffect(() => {
    if(user) {
      const { nickname: alias } = user;
      setNickname(alias);
    }
  }, []);

  const toAcademicRoom = () => {
    alert('You will be redirected to the Academic Room');
  };
  const createRoom = () => {
    socket.isHost = true;
    history.push('/gameroom');
  };

  const joinRoom = () => {
    history.push('/gameroom');
  };

  const updateNickname = ({ target }) => {
    socket.nickname = target.value;
    setNickname(target.value);
  };

  const updateRoomKey = ({ target }) => {
    socket.roomKey = target.value;
    console.log(target.value, socket.roomKey);
    setRoomKey(target.value);
  };

  return (

    <div className={styles.chooseGameContainer}>
      <LeftSideDrawer
        optionsButton={true}
        aboutUsButton={false}
      />
      <video className={styles.backgroundVideo} autoPlay muted loop>
        <source src="./src/assets/approaching_equations.mp4"
          type="video/mp4"></source>
      </video> 
      <section className={styles.section}>
        <div className={styles.academicCard}>
          <button 
            onClick={toAcademicRoom}>
            click me to go to the academic Room
          </button>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.competitiveCard}>
          <h2>How about a friendly mAthl33tz Competition</h2>
          <div className={styles.nickname}>
            <label htmlFor="nickname">
              Welcome {nickname}!
               Would you link to use another nickname for this game?
            </label>
            <input 
              name="nickname"
              type="text"
              value={nickname}
              onChange={updateNickname}
              placeholder="nickname" />
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
            onChange={updateRoomKey}
            placeholder="Enter Room Code Here" />
          <button 
            onClick={joinRoom}>
              click me to to join a Room
          </button>
        </div>
      </section>
    </div>
  );
};



export default ChooseGame;
