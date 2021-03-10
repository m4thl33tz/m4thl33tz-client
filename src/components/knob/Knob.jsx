import React from 'react';
import PropTypes from 'prop-types';
import styles from './Knob.css';

const Knob = ({ type }) => {
  return (
    <div className={styles.knob}>
      this knob does this:{type}
    </div>
  );
};

Knob.propTypes = {
  type: PropTypes.string.isRequired
};

export default Knob;
