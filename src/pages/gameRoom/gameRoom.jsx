import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// import { WAITING, START_GAME } from '../../constants/gameEvents';

import WaitingRoom from '../../slides/waitingroom/WaitingRoom';
import GameTable from '../../slides/gametable/GameTable';
import styles from './gameRoom.css';

export default function gameRoom({ socket }) {
  const [gameState, setGameState] = useState('WAITING');
  const [players, setPlayers] = useState([]);
  const [problemSet, setProblemSet] = useState([]);

  // const [isHost, setIsHost] = useState(false);
  const [roomKey, setRoomKey] = useState('');

  const { nickname, isHost } = socket;

  useEffect(() => {
    if(socket.isHost) socket.emit('CREATE_ROOM', { nickname });
    else {
      setRoomKey(socket.roomKey);
      console.log('JOINED');
      socket.emit('JOIN_ROOM', { roomKey: socket.roomKey, nickname });
      socket.emit('UPDATE_PLAYERS', { roomKey: socket.roomKey, nickname });
    }
  }, []);

  socket.on('PROBLEM_SET', problems => {
    setProblemSet(problems);
    console.log('PROBLEMS', problems);
  });

  socket.on('ROOM_KEY', ({ roomKey }) => {
    setRoomKey(roomKey);
    // setIsHost(isHost);
  });

  socket.on('JOIN_RESULTS', data => {
    const { userId } = data;

    setPlayers(players => {
      const playerFound = players.find(p => p.userId === userId);

      if(playerFound) return players;

      return [...players, data];
    });
  });

  let renderedComponent;

  switch(gameState) {
    case 'WAITING':
      renderedComponent = <WaitingRoom 
        {...{ socket, roomKey, setGameState, setPlayers, players, isHost } }/>;
      break;
    case 'START_GAME':
      renderedComponent = <BriefingCard {...{ socket, setGameState } }/>;
      break;
    case 'ROUND_ONE':
      renderedComponent = <GameTable
        {...{ socket, setGameState, problemSet, setProblemSet } }/>;
      break;
    case 'ROUND_OVER':
      renderedComponent = <GameOver socket={socket}/>;
      break;
    default:
      renderedComponent = <div>Something is not right!</div>;
      break;
  }

  return (
    <div className={styles.gameRoom}>{renderedComponent}</div>
  );
}




function BriefingCard({ socket, setGameState }) {
  if(socket) {
    socket.on('ROUND_ONE', setGameState);
  }

  return (
    <p>Game is Starting!</p>
  );
}


function GameOver({ socket }) {
  const history = useHistory();

  const goToLobby = () => {
    history.push('/choosegame');
  };

  return (
    <>
      <p>Game is over!</p>
      <button onClick={goToLobby}>To The Lobby</button>
    </>
  );
}
