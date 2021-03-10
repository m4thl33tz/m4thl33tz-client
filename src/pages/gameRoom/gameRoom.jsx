import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// import { WAITING, START_GAME } from '../../constants/gameEvents';

import WaitingRoom from '../../slides/waitingroom/WaitingRoom';
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




function GameTable({ socket, setGameState, problemSet, setProblemSet }) {
  const [counter, setCounter] = useState(0);
  const [answer, setAnswer] = useState('');

  const increment = () => {
    setCounter(counter => counter + 1);
  };

  const updateAnswer = ({ target }) => {
    setAnswer(target.value);
  };

  const checkAnswer = event => {
    event.preventDefault();

    const answer = Number(event.target[0].value);
    const isCorrect = answer === problemSet[counter].solution;

    setProblemSet(problems => {
      problems[counter].isCorrect = isCorrect;
      problems[counter].answer = answer;
      return problems;
    });

    setAnswer('');
    if(counter === problemSet.length - 1) return;
    if(counter < problemSet.length - 1) increment();
  };


  if(socket) {
    socket.on('ROUND_OVER', setGameState);
  }

  return (
    <>
      <p>It is the first round!</p>

      <p>Problem {counter + 1} out of {problemSet.length}</p>

      {
        counter > 0 ?
          problemSet[counter - 1].isCorrect
            ? <p>Correct!</p> 
            : <p>Incorrect!</p>
          : ''
      }

      <div
        dangerouslySetInnerHTML={{ __html: problemSet[counter]?.mml }}
      ></div>

      <form onSubmit={checkAnswer}>
        <label>Answer: </label>
        <input 
          onChange={updateAnswer}
          id="problem" 
          type="number"
          value={answer}
        />
        <button type="submit">Answer!</button>
      </form>

      <div>
        <button 
          onClick={increment}
          disabled={counter === problemSet.length - 1}
        >Next</button>
      </div>

    </>
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
