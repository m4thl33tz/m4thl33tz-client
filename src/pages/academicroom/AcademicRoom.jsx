import React, { useEffect, useState } from 'react';
import AnswerButton from '../../components/answerButton/AnswerButton';
import Feedback from '../../components/feedback/Feedback';
import ScoreCard from '../../components/scoreCard/ScoreCard';
import SoloMathbox from '../../components/soloMathbox/SoloMathbox';
import { getProblems } from '../../services/math-api';
import LeftSideDrawer from '../../components/drawers/LeftSideDrawer';
import styles from './Academicroom.css';
import UserOptions from '../../components/userOptions/UserOptions';

const AcademicRoom = (props) => {
  const [feedback, setFeedback] = useState('');
  const [problemString, setProblemString] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [allTimeScore, setAllTimeScore] = useState(0);
  const [setLength, setSetLength] = useState(0);
  const [problems, setProblems] = useState([]);
  const [answer, setAnswer] = useState('');
  const [operationType, setOperationType] = useState('addition');
  const [difficulty, setDifficulty] = useState('easy');
  const [counter, setCounter] = useState(0);
  
  const updateOperationType = ({ target }) => {
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

  const incrementScore = () => {
    setCurrentScore((currentScore) => currentScore + 1);
  };

  const disableSubmit = () => {
    document.getElementById('SubmitButton').disabled = true;
  };

  const enableSubmit = () => {
    document.getElementById('SubmitButton').disabled = false;
  };

  const disableNextAndSkip = () => {
    if(counter + 2 === setLength){ 
      document.getElementById('nextButton').disabled = true;
      document.getElementById('skipButton').disabled = true;
    }
  };

  const nextProblem = ({ target }) => {
    increment();
    setIsCorrect(null);
    setAnswer('');
    setFeedback('');
    enableSubmit();
    disableNextAndSkip();
  };

  const skipProblem = ({ target }) => {
    increment();
    setIsCorrect(null);
    setAnswer('');
    setFeedback('');
    disableNextAndSkip();
  };
  
  const showSolution = ({ target }) => {
    setFeedback(problems[counter].solution);
    disableSubmit();
  };

  const checkAnswer = async(event) => {
    event.preventDefault();
    disableSubmit();
    const parsedAnswer = Number(answer);
    const isCorrect = (parsedAnswer === problems[counter].solution);
    if(isCorrect === true) {
      incrementScore();
      setFeedback('You did it! Good job!');
    }
    else setFeedback('Nice try!');
  };

  useEffect(() => {
    getProblems({ type: operationType, difficulty }).then((problems) => {
      setProblems(problems);
      setSetLength(problems.length);
      setCounter(0);
    });
  }, [difficulty]);

  useEffect(() => {
    getProblems({ type: operationType, difficulty }).then((problems) => {
      setProblems(problems);
      setSetLength(problems.length);
      setCounter(0);
    });
  }, [operationType]);
  
  useEffect(() => {
    getProblems({ type: operationType, difficulty }).then((problems) => {
      setProblems(problems);
      setSetLength(problems.length);
    });
  }, []);
 
  return (
    <div className={styles.academicRoom}>
      <main className={styles.academicContainer}>
        <LeftSideDrawer />
        <div className={styles.problemColumn}>
          <div className={styles.responseContainer}>
            <Feedback
              feedback={feedback}
              setLength={setLength}
              counter={counter}
            />
          </div> 
          <div className={styles.problemContainer}>
            <SoloMathbox
              equation={problems[counter]?.equation}
              answer={answer}
              problemString={problemString}
              updateAnswer={updateAnswer}
              checkAnswer={checkAnswer}
              operationType={operationType}
              difficulty={difficulty}
            />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.answerButtonWrapper}>
              <AnswerButton
                text="Next Problem"
                id="nextButton"
                buttonFunction={nextProblem}
              />
              <AnswerButton
                text="Skip Problem"
                id="skipButton"
                buttonFunction={skipProblem}
              />
              <AnswerButton
                text="Show Solution"
                id="showButton"
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
          <UserOptions
            updateOperationType={updateOperationType}
            updateDifficulty={updateDifficulty}
            difficulty={difficulty}
            operationType={operationType}
          />
        </div>
      </main>
    </div>
  );
};

export default AcademicRoom;
