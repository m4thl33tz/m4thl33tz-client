import React, { useEffect, useState } from 'react';
import AnswerButton from '../../components/answerButton/AnswerButton';
import CalcButton from '../../components/calcButton/CalcButton';
import Feedback from '../../components/feedback/Feedback';
import ScratchPad from '../../components/scratchpad/ScratchPad';
import SoloMathbox from '../../components/soloMathbox/SoloMathbox';
import { getProblems } from '../../services/math-api';
// import PropTypes from 'prop-types'
import styles from './GameTable.css';



const GameTable = ({ socket, roomKey, players, setGameState, problemSet, setProblemSet }) => {
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

    const points = Number(isCorrect) * 10;

    socket.emit('UPDATE_SCORE', { roomKey, points });

    const marquee = isCorrect ? 'Correct!' : 'Incorrect!';

    setFeedback(() => {
      return marquee;
    });

    setProblemSet(problems => {
      problems[counter].isCorrect = isCorrect;
      problems[counter].answer = answer;
      return problems;
    });

    setAnswer('');
    if(counter === problemSet.length - 1) return;
    if(counter < problemSet.length - 1) increment();
  };

  return (

  // submit button is indeed better on the mathbox

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
            <Feedback 
              feedback={feedback}
              counter={counter}
              setLength={problemSet.length}
            />
          </div> 
          <div className={styles.problemContainer}>
            <SoloMathbox
              mml={problemSet[counter]?.mml}
              // problemString={problemString}
              updateAnswer={updateAnswer}
              checkAnswer={checkAnswer}
              answer={answer}
            />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.calcButtonWrapper}>
              <CalcButton icon="Fraction" />
              <CalcButton icon="dot" />
              <CalcButton icon="exponent" />
            </div>
            <div className={styles.answerButtonWrapper}>
              <AnswerButton
                text="submit"
                buttonFunction={checkAnswer}
              />
              
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
          <ScratchPad />
        </div>
      </main>
    </div>
  );
};

// GameTable.propTypes = {

// }

export default GameTable;
