import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SoloMathbox.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



const SoloMathbox = ({  answer, equation, checkAnswer, updateAnswer, operationType, difficulty }) => {
  
  return (
    <div className={styles.soloMathBox}>
      <div className={styles.problemString}>
        <p>{difficulty} {operationType}</p>
      </div>
      <div className={styles.equationWrapper}>
        <span 
          className={styles.equation}
        >{equation}</span>
        <form onSubmit={checkAnswer} >
          <TextField
            autoFocus
            onChange={updateAnswer}
            value={answer}
            placeholder="answer here..."
            style={{ marginRight: '10px', padding: '10px' }}
          />
          <Button
            id="SubmitButton"
            type="submit"
            variant="contained"
            color="default"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

SoloMathbox.propTypes = {
  answer: PropTypes.string,
  equation: PropTypes.string,
  checkAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  operationType: PropTypes.string,
  difficulty: PropTypes.string,
};

export default SoloMathbox;
