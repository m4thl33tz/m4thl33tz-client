import React, { useEffect, useState } from 'react';
import AcademicFooter from '../../components/academicFooter/AcademicFooter';
import AnswerButton from '../../components/answerButton/AnswerButton';
import CalcButton from '../../components/calcButton/CalcButton';
import Feedback from '../../components/feedback/feedback';
import ScoreCard from '../../components/scoreCard/ScoreCard';
import ScratchPad from '../../components/scratchpad/ScratchPad';
import SoloMathbox from '../../components/soloMathbox/SoloMathbox';
import { getProblems } from '../../services/math-api';
// import PropTypes from 'prop-types'
import styles from './GameTable.css';



const GameTable = (props) => {
  const [feedback, setFeedback] = useState('');
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [allTimeScore, setAllTimeScore] = useState(0);
  const [problems, setProblems] = useState([]);
  // const [answer, setAnswer] = useState('');
  const [operationType, setOperationType] = useState('addition');
  const [difficulty, setDifficulty] = useState('easy');
  const [counter, setCounter] = useState(0);
  const [mml, setMml] = useState(null);
  

  //answerButton functions
  const submitAnswer = () => alert('clicked submit answer');
  const skipProblem = () => alert('clicked skip problem');
  const showSolution = () => alert('clicked show solution');

  const updateType = ({ target }) => {
    setOperationType(target.value);
  };

  const updateDifficulty = ({ target }) => {
    setDifficulty(target.value);
  };

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
  
  useEffect(() => {
    getProblems({ type: operationType, difficulty }).then((problems) => {
      setProblems(problems);
    });
  }, []);
  
  const problem = problems[counter];

  console.log('counter', counter);
  console.log('problem', problem);

  return (
    <div className={styles.gameTable}>
      <main className={styles.gameTableContainer}>
        <div className={styles.problemColumn}>
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
              <AnswerButton
                text="skip"
                buttonFunction={skipProblem}
              />
              <AnswerButton
                text="show solution"
                buttonFunction={showSolution}
              />
            </div>
          </div>
        </div>
        <div className={styles.answerColumn}>
          <ScoreCard
            currentScore={currentScore}
            allTimeScore={allTimeScore}
          />
          <ScratchPad />
        </div>
      </main>
      <AcademicFooter
        updateType={updateType}
        updateDifficulty={updateDifficulty}
        difficulty={difficulty}
        operationType={operationType}
      />
    </div>
  );
};

// GameTable.propTypes = {

// }

export default GameTable;
