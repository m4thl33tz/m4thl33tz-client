import React from 'react';
import PropTypes from 'prop-types';
import styles from './SoloMathBox.css';

const SoloMathbox = ({ answer, equation, problemString, checkAnswer, updateAnswer }) => {
  //isCorrect will be used to change styles based on true or false
  return (
    <div className={styles.soloMathBox}>
      <div className={styles.problemString}>
        <p>a problemString {problemString}</p>
      </div>
      <div className={styles.equationWrapper}>
        <span className={styles.equation}>{equation}{answer}</span>
        <form onSubmit={checkAnswer} >
          <input
            value={answer}
            onChange={updateAnswer}
            className={styles.myAnswer}
            placeholder="answer here..." />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

SoloMathbox.propTypes = {
  answer: PropTypes.string.isRequired,
  equation: PropTypes.string.isRequired,
  problemString: PropTypes.string.isRequired,
  checkAnswer: PropTypes.bool,
  updateAnswer: PropTypes.func.isRequired,
};

export default SoloMathbox;
