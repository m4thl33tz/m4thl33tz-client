import React from 'react';
import PropTypes from 'prop-types';
import styles from './Feedback.css';
import Anime from 'react-anime';

const Feedback = ({ feedback, counter, setLength }) => {

  return (
    <>
      <div className={styles.feedbackItem}>
      </div>
      <div className={styles.h3}>
        <h3>
          {counter === 0 ? 'Welcome' : feedback}
        </h3>
        <h3>{counter + 1}/{setLength}</h3>
      </div>
    </>
  );
};

Feedback.propTypes = {
  feedback: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  setLength: PropTypes.number.isRequired,
};

export default Feedback;
