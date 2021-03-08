import React from 'react';
// import PropTypes from 'prop-types'
import styles from './Academicroom.css';
// import './Academicroom.scss';



const AcademicRoom = (props) => {
  return (
    <div className={styles.academicRoom}>
      <main className={styles.academicContainer}>
        <div className={styles.problemColumn}>
          <div className={styles.problemContainer}>
            <div className={styles.mathBox}>
              <div className={styles.problemString}>
                <p>What is 15 times 3?</p>
              </div>
              <div className={styles.equationWrapper}>
                <span className={styles.equation}>15 x 3 =</span>
                <input className={styles.myAnswer} 
                  placeholder="answer here..." />
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.calcButtonWrapper}>
              <button className={styles.fracButton}>Fraction</button>
              <button className={styles.dotButton}>dot</button>
              <button className={styles.exponentButton}>exponent</button>
            </div>
            <div className={styles.answerButtonWrapper}>
              <button className={styles.submitButton}>submit</button>
              <button className={styles.submitButton}>skip</button>
              <button className={styles.submitButton}>show answer</button>
            </div>
          </div>
        </div>
        <div className={styles.answerColumn}>
          <div className={styles.responseContainer}>
            <h3>That's correct</h3>
          </div>
          <div className={styles.showmeContainer}>
            <button 
              className={styles.showmeButton} 
              style={{ display: 'block' }}>
              Show Me the Answer!
            </button>
          </div>
        </div>
      </main>
      <footer>
        <div className={styles.knob}>knob1</div>
        <div className={styles.knob}>knob2</div>
        <div className={styles.knob}>knob3</div>
        <div className={styles.knob}>knob4</div>
      </footer>
    </div>
  )
}

// AcademicRoom.propTypes = {

// }

export default AcademicRoom;
