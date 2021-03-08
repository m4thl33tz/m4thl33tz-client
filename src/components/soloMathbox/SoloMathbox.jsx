import React from 'react';
import PropTypes from 'prop-types';
import styles from './SoloMathBox.css';

const SoloMathbox = ({ equation, problemString, isCorrect }) => {
  //isCorrect will be used to change styles based on true or false
  return (
    <div className={styles.soloMathBox}>
      <div className={styles.problemString}>
        <p>a problemString {problemString}</p>
      </div>
      <div className={styles.equationWrapper}>
        <span className={styles.equation}>an Equation{equation}</span>
        <input className={styles.myAnswer} 
          placeholder="answer here..." />
      </div>
    </div>
  );
};

SoloMathbox.propTypes = {
  equation: PropTypes.string.isRequired,
  problemString: PropTypes.string.isRequired,
  isCorrect: PropTypes.boolean
};

export default SoloMathbox;
