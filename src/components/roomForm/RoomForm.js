import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

function RoomForm({ socket }) {
  const [formValues, setFormValues] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('CREATE_ROOM', formValues);
  };

  const handleChange = ({ target }) => {
    setFormValues(target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="create room..." onChange={handleChange} />
      <button type="submit">Create</button>
    </form>
  );
}

RoomForm.propTypes = {};

export default RoomForm;
