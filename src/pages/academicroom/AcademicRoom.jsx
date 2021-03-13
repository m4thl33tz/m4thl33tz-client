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
  const [submitButton, setSubmitButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const [skipButton, setSkipButton] = useState(false);
  
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
    setSubmitButton(true);
  };

  const enableSubmit = () => {
    setSubmitButton(false);
  };

  const disableNextAndSkip = () => {
    setNextButton(true);
    setSkipButton(true);
  };

  const nextProblem = ({ target }) => {
    if(counter + 1 < setLength){
      enableSubmit();
      increment();
      setIsCorrect(null);
      setAnswer('');
      setFeedback('Another one!');
    } else {
      disableSubmit();
      disableNextAndSkip();
      setFeedback('Choose another problem set and try again!');
    }
  };

  const skipProblem = ({ target }) => {
    if(counter + 1 < setLength){
      enableSubmit();
      increment();
      setIsCorrect(null);
      setAnswer('');
      setFeedback('Let\'s try another one!');
    } else {
      disableSubmit();
      disableNextAndSkip();
      setFeedback('Choose another problem set and try again!');
    }
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
      setSubmitButton(false);
      setNextButton(false);
      setSkipButton(false);
    });
  }, [difficulty, operationType]);
  
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
              submitButton={submitButton}
            />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.answerButtonWrapper}>
              <AnswerButton
                text="Next Problem"
                id="nextButton"
                buttonFunction={nextProblem}
                disabled={nextButton}
              />
              <AnswerButton
                text="Skip Problem"
                id="skipButton"
                buttonFunction={skipProblem}
                disabled={skipButton}
              />
              <AnswerButton
                text="Show Solution"
                id="showButton"
                buttonFunction={showSolution}
                disabled={false}
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
