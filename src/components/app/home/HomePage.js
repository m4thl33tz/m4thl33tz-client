import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Box, Button } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

import useStyles from './HomePage.styles';

function HomePage() {
  const classes = useStyles();

  const { loginWithRedirect, user } = useAuth0();

  console.log(JSON.stringify(user, null, 2));

  return (
    <Container
      disableGutters={true}
      style={{ border: 'solid 4px red' }}
      className={classes.root}
      component="section"
    >
      <Grid
        md={7}
        className={classes.backgroundContainer}
        item
        container
      ></Grid>

      <Grid
        className={classes.buttonContainer}
        md={5}
        style={{ border: 'solid 4px green' }}
        item
        container
      >
        <Grid item style={{ border: 'solid 4px yellow' }}>
          <Button
            onClick={() => loginWithRedirect()}
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

HomePage.propTypes = {};

export default HomePage;
