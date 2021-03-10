import React from 'react';
import PropTypes from 'prop-types';
import styles from './AnswerButton.css';

const AnswerButton = ({ text, buttonFunction, id }) => {
  return (
    <button 
      id={id}
      onClick={buttonFunction}
      className={styles.answerButton}>
      {text}
    </button>
  );
};

AnswerButton.propTypes = {
  text: PropTypes.string.isRequired,
  buttonFunction: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default AnswerButton;
