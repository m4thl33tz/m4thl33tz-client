/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './WaitingRoom.css';

const WaitingRoom = props => {
  return (
  // Wrapped in the  game room
    <div className={styles.gameRoom}>
      <div className={styles.waitingRoom}>
        <header>
          <div className={styles.homeButton}>
            <a href="/choosegame">Back to  Home</a>
          </div>
          <h1>M4th33tz</h1>
        </header>
        {/* Back to front page */}
        <div className={styles.waitingContent}>
          <div className={styles.waitingLeft}>
            erlgjhsd
            <div className={styles.joinRoomInfo}></div>
            <div className={styles.waitingRoomOptions}></div>
          </div>
          <div className={styles.waitingRight}>
            dfgdfgdfg
            <div className={styles.roster}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

WaitingRoom.propTypes = {

}

export default WaitingRoom;
