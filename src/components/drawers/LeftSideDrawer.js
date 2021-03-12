import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Drawer, List, IconButton, Typography } from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PeopleIcon from '@material-ui/icons/People';

import useStyles from './LeftDrawer.styles';

function LeftSideDrawer({ optionsButton, aboutUsButton }) {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if(
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <IconButton className={classes.iconButton} onClick={toggleDrawer(true)}>
        <DehazeIcon className={classes.iconButton} color="primary" />
      </IconButton>
      <Drawer
        open={isOpen}
        anchor="left"
        onClick={toggleDrawer(false)}
        onClose={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <div className={classes.toolbar}>
          <Typography variant="h5" style={{ marginLeft: '10px' }}>
            M4thl33tz
          </Typography>
        </div>
        <Divider />
        <div className={classes.list}>
          <List className={classes.list}>
            <ListItem 
              button
              onClick={() => history.push('/choosegame')}
              disabled={optionsButton}
            >
              <ListItemIcon>{<SportsEsportsIcon />}</ListItemIcon>
              <ListItemText primary={'Game options'} />
            </ListItem>
            <ListItem
              button
              onClick={() => history.push('/m4thl33tz')}
              disabled={aboutUsButton}
            >
              <ListItemIcon>{<PeopleIcon />}</ListItemIcon>
              <ListItemText primary={'Meet the m4thl33tz'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}

LeftSideDrawer.propTypes = {
  optionsButton: PropTypes.bool.isRequired,
  aboutUsButton: PropTypes.bool.isRequired,
};

export default LeftSideDrawer;
