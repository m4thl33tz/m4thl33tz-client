import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SoloMathbox.css';



const SoloMathbox = ({  mml, checkAnswer, updateAnswer }) => {
  //isCorrect will be used to change styles based on true or false


  const [answer, setAnswer] = useState('');
  
  return (
    <div className={styles.soloMathBox}>
      <div className={styles.problemString}>
        <p>a problemString </p>
      </div>
      <div className={styles.equationWrapper}>
        <span 
          className={styles.equation}
          dangerouslySetInnerHTML={{
            __html: mml,
          }}></span>
        <span>{answer}</span>
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
  MML: PropTypes.string.isRequired,
  problemString: PropTypes.string.isRequired,
  checkAnswer: PropTypes.bool,
  updateAnswer: PropTypes.func.isRequired,
};

export default SoloMathbox;
