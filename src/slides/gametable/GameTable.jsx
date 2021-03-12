import React, { useEffect, useState } from 'react';
import AnswerButton from '../../components/answerButton/AnswerButton';
import CalcButton from '../../components/calcButton/CalcButton';
import FeedbackCompete from '../../components/feedbackcompete/FeedbackCompete';
import ScratchPad from '../../components/scratchpad/ScratchPad';
import SoloMathbox from '../../components/soloMathbox/SoloMathbox';
import { getProblems } from '../../services/math-api';
// import PropTypes from 'prop-types'
import styles from './GameTable.css';



const GameTable = ({ socket, roomKey, players, setGameState, problemSet, setProblemSet, difficulty }) => {
  const [counter, setCounter] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);

  // Socket Listeners
  useEffect(() => {
    socket.on('TIMER', ({ roomKey, timeLeft }) => {
      if(roomKey === socket.roomKey) setTimeLeft(timeLeft);
    });

    socket.on('ROUND_OVER', setGameState);
  }, []);  

  // State updaters
  const increment = () => {
    setCounter(counter => counter + 1);
  };

  const updateAnswer = ({ target }) => {
    setAnswer(target.value);
  };

  const checkAnswer = event => {
    event.preventDefault();

    // Get the user's answer and check it against solution
    const answer = Number(event.target[0].value);
    const isCorrect = answer === problemSet[counter].solution;

    // Convert difficulty to number to scale points with difficulty
    let diffNumber = 1;

    if(difficulty === 'medium') diffNumber = 5;
    if(difficulty === 'hard') diffNumber = 10;

    // Calculate points
    const points = Number(isCorrect) * 10 * diffNumber;

    // Send points to the back end
    socket.emit('UPDATE_SCORE', { roomKey, points });

    // Tell user if their answer was correct
    const marquee = isCorrect ? 'Correct!' : 'Incorrect!';

    setFeedback(() => {
      return marquee;
    });

    // Reset answer input
    setAnswer('');

    // Increment counter. Make sure it doesn't break!
    if(counter === problemSet.length - 1) return;
    if(counter < problemSet.length - 1) increment();
  };

  console.log(problemSet);

  return (
    <div className={styles.gameTable}>
      <main className={styles.gameTableContainer}>
        <video className={styles.backgroundVideo} autoPlay muted loop
        >
          <source src="./src/assets/approaching_equations.mp4"
            type="video/mp4"></source>
        </video> 
        <div className={styles.problemColumn}>
          <div className={styles.timer}>
            <p>{timeLeft || ''}</p>
          </div>
          <div className={styles.responseContainer}>
            <p>Problem {counter + 1} out of {problemSet.length}</p>
            <FeedbackCompete 
              feedback={feedback}
            />
          </div> 
          <div className={styles.problemContainer}>
            <SoloMathbox
              equation={problemSet[counter]?.equation}
              updateAnswer={updateAnswer}
              checkAnswer={checkAnswer}
              answer={answer}
            />
          </div>
          <div className={styles.inputContainer}>

            <div className={styles.answerButtonWrapper}>
            </div>
          </div>
        </div>
        <div className={styles.answerColumn}>
          <div className={styles.scoreChart}>
            <ul>
              {
                players.map(p => {
                  return (
                    <li key={p.userId}>{p.nickname} {p.points}</li>
                  );
                })
              }
              
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameTable;
