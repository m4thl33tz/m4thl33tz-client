import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserOptions.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const UserOptions = ({ updateOperationType, updateDifficulty, operationType, difficulty }) => {
  const classes = useStyles();
  return (
    <footer className={styles.userOptions}>
      <FormControl className={classes.formControl}>
        <InputLabel id="difficulty-label">Difficulty</InputLabel>
        <Select
          labelId="difficulty-label"
          id="difficulty-select"
          value={difficulty}
          onChange={updateDifficulty}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>

        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="operation-type-label">Operation</InputLabel>
        <Select
          labelId="operation-type-label"
          id="operation-select"
          value={operationType}
          onChange={updateOperationType}
        >
          <MenuItem value="addition">Addition</MenuItem>
          <MenuItem value="subtraction">Subtraction</MenuItem>
          <MenuItem value="division">Division</MenuItem>
          <MenuItem value="multiplication">Multiplication</MenuItem>
        </Select>
      </FormControl>
    </footer>
  );
};

UserOptions.propTypes = {
  updateOperationType: PropTypes.func.isRequired,
  updateDifficulty: PropTypes.func.isRequired,
  operationType: PropTypes.string,
  difficulty: PropTypes.string,
};

export default UserOptions;
