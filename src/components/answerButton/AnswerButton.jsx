import React from 'react';
import PropTypes from 'prop-types';
import styles from './AnswerButton.css';

const AnswerButton = ({ text, buttonFunction }) => {
  return (
    <button 
      onClick={buttonFunction}
      className={styles.answerButton}>
      {text}
    </button>
  );
};

AnswerButton.propTypes = {
  text: PropTypes.string.isRequired,
  buttonFunction: PropTypes.func.isRequired
};

export default AnswerButton;
