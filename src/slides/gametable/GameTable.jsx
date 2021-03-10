import React, { useEffect, useState } from 'react';
import AnswerButton from '../../components/answerButton/AnswerButton';
import CalcButton from '../../components/calcButton/CalcButton';
import Feedback from '../../components/feedback/Feedback';
import ScratchPad from '../../components/scratchpad/ScratchPad';
import SoloMathbox from '../../components/soloMathbox/SoloMathbox';
import { getProblems } from '../../services/math-api';
// import PropTypes from 'prop-types'
import styles from './GameTable.css';



const GameTable = (props) => {
  const [feedback, setFeedback] = useState('Correct! or Nope');
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [problems, setProblems] = useState([]);
  const [counter, setCounter] = useState(0);
  const [mml, setMml] = useState(null);
  

  //answerButton functions
  const submitAnswer = () => alert('clicked submit answer');
  const skipProblem = () => alert('clicked skip problem');
  const showSolution = () => alert('clicked show solution');


  const updateAnswer = ({ target }) => {
    setAnswer(target.value);
  };
  
  const increment = () => {
    setCounter((counter) => counter + 1);
  };

  const checkAnswer = (event) => {
    event.preventDefault();
    const parsedAnswer = Number(answer);
    console.log(parsedAnswer);

    const isCorrect = parsedAnswer === problems[counter].solution;
    return isCorrect;
  };
  
  // useEffect(() => {
  //   //logic for getting problems from the already-gathered API

  //   // getProblems({ type: operationType, difficulty }).then((problems) => {
  //   //   setProblems(problems);
  //   });
  // }, []);
  
  const problem = problems[counter];

  console.log('counter', counter);
  console.log('problem', problem);

  return (

  // submit button is indeed better on the mathbox

    <div className={styles.gameTable}>
      <main className={styles.gameTableContainer}>
        <div className={styles.problemColumn}>
          <div className={styles.timer}>
            <p>60</p>
          </div>
          <div className={styles.responseContainer}>
            <Feedback feedback={feedback} />
          </div> 
          <div className={styles.problemContainer}>
            <SoloMathbox
              mml={problems[counter]?.mml}
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
                buttonFunction={submitAnswer}
              />
              
            </div>
          </div>
        </div>
        <div className={styles.answerColumn}>
          <div className={styles.scoreChart}>
            <ul>
              <li>
                <span>Sam: </span><span>100000</span>
              </li>
              <li>
                <span>Jonathan: </span><span>90</span>
              </li>
              <li>
                <span>Justin: </span><span>80</span>
              </li>
              <li>
                <span>David: </span><span>60</span>
              </li>
              <li>
                <span>Andrew: </span><span>50</span>
              </li>
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
