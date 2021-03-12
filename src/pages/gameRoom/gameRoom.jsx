import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// import { WAITING, START_GAME } from '../../constants/gameEvents';

import WaitingRoom from '../../slides/waitingroom/WaitingRoom';
import GameTable from '../../slides/gametable/GameTable';
import TitleCard from '../../slides/cards/R_One_TitleCard';
import TimeUpCard from '../../slides/cards/R_One_TimeUpCard';
import WinnerCard from '../../slides/cards/WinnerCard';

import styles from './gameRoom.css';
import ScoreSheet from '../../slides/scoresheet/ScoreSheet';

export default function gameRoom({ socket }) {
  const [gameState, setGameState] = useState('WAITING');
  const [players, setPlayers] = useState([]);
  const [problemSet, setProblemSet] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [roomKey, setRoomKey] = useState('');
  const [apiLoading, setApiLoading] = useState(true);

  const { nickname, isHost } = socket;

  useEffect(() => {
    if(socket.isHost) socket.emit('CREATE_ROOM', { nickname });

    else {
      setRoomKey(socket.roomKey);
      socket.emit('JOIN_ROOM', { roomKey: socket.roomKey, nickname });
      socket.emit('UPDATE_PLAYERS', { roomKey: socket.roomKey, nickname });
    }

    // Socket Listeners
    socket.on('PROBLEM_SET', problems => {
      setProblemSet(problems);
      setApiLoading(false);
    });
  
    socket.on('ROOM_KEY', ({ roomKey }) => {
      socket.roomKey = roomKey;
      setRoomKey(roomKey);
    });
  
    socket.on('JOIN_RESULTS', data => {
      const newPlayers = data.filter(player => {
        const { userId } = player;

        const playerExists = players.find(p => p.userId === userId);
        if(!playerExists) return true;

        return false;
      });
  
      setPlayers(players => [...players, ...newPlayers]);
    });

    socket.on('UPDATE_SCORE_RESULTS', ({ userId, points }) => {
      setPlayers(players => {
        let copy = [...players];
        const player = copy.find(p => p.userId === userId);

        player.points = points;

        copy = copy.sort((a, b) => b.points - a.points);

        console.log(copy);

        return copy;
      });
    });

    socket.on('GAME_OPTIONS_RESULTS', diff => {
      setDifficulty(diff);
      console.log('Difficulty', diff);
    });
  }, []);

  let renderedComponent;

  switch(gameState) {
    case 'WAITING':
      renderedComponent = <WaitingRoom {...{ 
        socket, 
        roomKey, 
        setGameState, 
        setPlayers,
        players, 
        isHost, 
        difficulty, 
        setDifficulty
      } }/>;
      break;
    case 'START_GAME':
      renderedComponent = <TitleCard {...{ 
        socket, 
        setGameState, 
        apiLoading 
      } }/>;
      break;
    case 'ROUND_ONE':
      renderedComponent = <GameTable {...{ 
        socket, 
        roomKey, 
        players, 
        setGameState, 
        problemSet, 
        setProblemSet,
        difficulty
      } }/>;
      break;
    case 'ROUND_OVER':
      renderedComponent = <TimeUpCard {...{ socket, setGameState }}/>;
      break;
    case 'GAME_OVER':
      renderedComponent = <ScoreSheet {...{ socket, players, setGameState }} />;
      break;
    case 'DISPLAY_WINNER':
      renderedComponent = <WinnerCard players={players}/>;
      break;
    default:
      renderedComponent = <div>Something is not right!</div>;
      break;
  }

  return (
    <div className={styles.gameRoom}>{renderedComponent}</div>
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
