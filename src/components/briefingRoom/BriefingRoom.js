import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Container, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    maxHeight: '100vh',
    width: '100%',
    maxWidth: '100%',
  },
  acedemicButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  competeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '200px',
    height: '50px',
  },
}));

function BriefingRoom() {
  const classes = useStyles();

  return (
    <Container
      className={classes.root}
      style={{ border: 'solid 4px red' }}
      component="section"
    >
      <Grid
        className={classes.acedemicButtonContainer}
        style={{ border: 'solid 4px green' }}
        md={6}
        item
        container
      >
        <Grid item>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Acedemic
          </Button>
        </Grid>
      </Grid>
      <Grid
        className={classes.competeButtonContainer}
        style={{ border: 'solid 4px blue' }}
        md={6}
        item
        container
      >
        <Grid item>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Competitive
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

BriefingRoom.propTypes = {};

export default BriefingRoom;
