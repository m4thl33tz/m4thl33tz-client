import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SoloMathbox.css';



const SoloMathbox = ({  answer, mml, checkAnswer, updateAnswer }) => {
  //isCorrect will be used to change styles based on true or false

  
  return (
    <div className={styles.soloMathBox}>
      <div className={styles.problemString}>
        <p>equation will show below</p>
      </div>
      <div className={styles.equationWrapper}>
        <span 
          className={styles.equation}
          dangerouslySetInnerHTML={{
            __html: mml,
          }}></span>
        <form onSubmit={checkAnswer} >
          <input
            value={answer}
            onChange={updateAnswer}
            className={styles.myAnswer}
            placeholder="answer here..." />
          <button id="SubmitButton" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

SoloMathbox.propTypes = {
  answer: PropTypes.string.isRequired,
  mml: PropTypes.string.isRequired,
  checkAnswer: PropTypes.func,
  updateAnswer: PropTypes.func.isRequired,
};

export default SoloMathbox;
