import React from 'react'
import PropTypes from 'prop-types'
import styles from './AcademicFooter.css';
import Knob from '../knob/Knob';
import VolumeBar from '../volumebar/VolumeBar';

const AcademicFooter = () => {
  return (
    <footer className={styles.academicFooter}>
      <Knob type="knob 1"/>
      <Knob type="knob 2"/>
      <Knob type="knob 3"/>
      <Knob type="knob 4"/>
      <VolumeBar />

    </footer>
  )
}

export default AcademicFooter
