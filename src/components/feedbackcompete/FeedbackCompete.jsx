import React from 'react';
import PropTypes from 'prop-types';
import styles from './FeedbackCompete.css';

const FeedbackCompete = ({ feedback }) => {

  return (
    <>
      <div className={styles.feedbackItem}>
      </div>
      <div className={styles.h3}>
        <h3>
          {feedback}
        </h3>
      </div>
    </>
  );
};

FeedbackCompete.propTypes = {
  feedback: PropTypes.string.isRequired
};

export default FeedbackCompete;
