import React from 'react';
import PropTypes from 'prop-types';
import styles from './Feedback.css';

const Feedback = ({ feedback }) => {
  return (
    <div className={styles.feedbackItem}>
      <h3>{feedback}</h3>
    </div>
  );
};

Feedback.propTypes = {
  feedback: PropTypes.string.isRequired
};

export default Feedback;
