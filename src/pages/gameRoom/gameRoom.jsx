import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// import { WAITING, START_GAME } from '../../constants/gameEvents';

export default function gameRoom({ socket }) {
  const [gameState, setGameState] = useState('WAITING');
  const [players, setPlayers] = useState([]);
  const [problemSet, setProblemSet] = useState([]);

  const [isHost, setIsHost] = useState(false); // Necessary?
  const [roomKey, setRoomKey] = useState('');

  const { nickname } = socket;

  useEffect(() => {
    if(socket.isHost) socket.emit('CREATE_ROOM', { nickname });
    else {
      setRoomKey(socket.roomKey);
      console.log('JOINED');
      socket.emit('JOIN_ROOM', { roomKey: socket.roomKey, nickname });
      socket.emit('UPDATE_PLAYERS', { roomKey: socket.roomKey, nickname });
    }
  }, []);
  
  socket.on('ROOM_KEY', ({ roomKey, isHost }) => {
    setRoomKey(roomKey);
    setIsHost(isHost);
  });

  socket.on('PROBLEM_SET', problems => setProblemSet(problems));

  socket.on('JOIN_RESULTS', data => {
    const { userId } = data;

    setPlayers(players => {
      const playerFound = players.find(p => p.userId === userId);

      if(playerFound) return players;

      return [...players, data];
    });
  });


  // ------ WAITING ROOM ---------------
  if(gameState === 'WAITING') {
    return <WaitingRoom 
      {...{ socket, roomKey, setGameState, setPlayers, players, isHost } }
    />;
  }

  // ------ BRIEFING CARD --------------
  if(gameState === 'START_GAME') {
    return <BriefingCard {...{ socket, setGameState } }/>;
  }

  // ------ GAME TABLE -----------------
  if(gameState === 'ROUND_ONE') {
    return <GameTable 
      {...{ socket, setGameState, problemSet, setProblemSet } }/>;
  }

  if(gameState === 'ROUND_OVER') {
    return <GameOver socket={socket}/>;
  }
}








function WaitingRoom({ 
  socket, 
  roomKey, 
  setGameState, 
  setPlayers, 
  players, 
  isHost 
}) {
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

  return (
    <>
    
      <p>Waiting for players</p>
      <p>{roomKey}</p>
      <button
        style={{ visibility: isHost ? 'visible' : 'hidden' }}
        onClick={startGame}
      >Start Game</button>


      {
        players.map(player => {
          return (
            <p key={player.userId}>{player.nickname}</p>
          );
        })
      }


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


    </>
  );
}




function BriefingCard({ socket, setGameState, setProblemSet }) {
  if(socket) {
    socket.on('ROUND_ONE', setGameState);
    socket.on('PROBLEM_SET', setProblemSet);
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
