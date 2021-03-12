import React,  { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './ChooseGame.css';
import LeftSideDrawer from '../../components/drawers/LeftSideDrawer';
import Button from '@material-ui/core/Button';

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
    history.push('/academicroom');
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
          <Button
            variant="contained"
            color="primary"
            onClick={toAcademicRoom}
          >
            Academic Room
          </Button>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.competitiveCard}>
          <h2>How About A Friendly M4thl33tz Competition</h2>
          <div className={styles.nickname}>
            <label htmlFor="nickname">
              <h3>Welcome {nickname}!</h3>
              <h3>Choose a nickname for this game!</h3>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={createRoom}
          >
              Create a New Game
          </Button>
        </div>
        <div className={styles.joinRoom}>
          <h3 htmlFor="join-room">Join a Game Room</h3>
          <div>
            <input 
              name="join-room"
              type="text"
              value={roomKey}
              onChange={updateRoomKey}
              placeholder="Enter Room Code Here" />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={joinRoom}
          >
              Join a Room
          </Button>
        </div>
      </section>
    </div>
  );
};



export default ChooseGame;
