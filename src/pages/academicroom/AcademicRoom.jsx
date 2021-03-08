import React, { useState } from 'react';
import AcademicFooter from '../../components/academicFooter/AcademicFooter';
import AnswerButton from '../../components/answerButton/AnswerButton';
import CalcButton from '../../components/calcButton/CalcButton';
import Feedback from '../../components/feedback/feedback';
import ScoreCard from '../../components/scoreCard/ScoreCard';
import ScratchPad from '../../components/scratchpad/ScratchPad';
import SoloMathbox from '../../components/soloMathbox/SoloMathbox';
// import PropTypes from 'prop-types'
import styles from './Academicroom.css';
// import './Academicroom.scss';



const AcademicRoom = (props) => {
  const [feedback, setFeedback] = useState('');
  const [equation, setEquation] = useState('');
  const [problemString, setProblemString] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [allTimeScore, setAllTimeScore] = useState(0);

  //answerButton functions
  const submitAnswer = () => alert('clicked submit answer');
  const skipProblem = () => alert('clicked skip problem');
  const showSolution = () => alert('clicked show solution');
  

  return (
    <div className={styles.academicRoom}>
      <main className={styles.academicContainer}>
        <div className={styles.problemColumn}>
          <div className={styles.responseContainer}>
            <Feedback feedback={feedback} />          
          </div> 
          <div className={styles.problemContainer}>
            <SoloMathbox
              equation={equation}
              problemString={problemString}
              isCorrect={isCorrect}
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
      <AcademicFooter />
    </div>
  );
};

// AcademicRoom.propTypes = {

// }

export default AcademicRoom;
