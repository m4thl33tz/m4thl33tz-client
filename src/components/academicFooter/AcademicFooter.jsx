import React from 'react';
import PropTypes from 'prop-types';
import styles from './AcademicFooter.css';
import Knob from '../knob/Knob';
import VolumeBar from '../volumebar/VolumeBar';

const AcademicFooter = ({ updateType, updateDifficulty, operationType, difficulty }) => {
  return (
    <footer className={styles.academicFooter}>
      <div type="knob 1"> 
        <select value={difficulty} onChange={updateDifficulty}>
          <option value="">
            Difficulty
          </option>
          <option value="easy">
            Easy
          </option>
          <option value="medium">
            Medium
          </option>
          <option value="hard">
            Hard
          </option>
        </select>
      </div>
      <div>
        <select value={operationType} onChange={updateType}>
          <option value="">
            Operation
          </option>
          <option value="addition">
            Addition
          </option>
          <option value="subtraction">
            Subtraction
          </option>
          <option value="division">
            Division
          </option>
          <option value="multiplication">
            Multiplication
          </option>
        </select>
      </div>
      <Knob type="knob 3"/>
      <Knob type="knob 4"/>
      <VolumeBar />

    </footer>
  );
};

AcademicFooter.propTypes = {
  updateType: PropTypes.func.isRequired,
  updateDifficulty: PropTypes.func.isRequired,
  operationType: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default AcademicFooter;
