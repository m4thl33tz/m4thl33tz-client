import React from 'react';
import PropTypes from 'prop-types';
import styles from './AnswerButton.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const AnswerButton = ({ text, buttonFunction, id, disabled }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}> 
      <Button
        variant="contained"
        color="primary"
        id={id}
        onClick={buttonFunction}
        className={styles.answerButton}
        disabled={disabled}      
      >
        {text}
      </Button>
    </div>
  );
};

AnswerButton.propTypes = {
  text: PropTypes.string.isRequired,
  buttonFunction: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default AnswerButton;
