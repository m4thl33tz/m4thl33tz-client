import React from 'react';
import PropTypes from 'prop-types';
import styles from './CalcButton.css';

const CalcButton = ({ icon }) => {
  return (
    <button className={styles.calcButton}>
      {icon}
    </button>
  );
};

CalcButton.propTypes = {
  icon: PropTypes.string.isRequired
};

export default CalcButton;
