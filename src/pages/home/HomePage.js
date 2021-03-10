import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Box, Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { checkAndCreate, findByEmail } from "../../utils/checkAndCreate";
import useStyles from "./HomePage.styles";

// Hello world?
// rm -rf ~

function HomePage() {
  const classes = useStyles();
  //this is grabbing the info we need from  auth0
  const { loginWithPopup, user, logout } = useAuth0();
  // after the user logs in or signs up with AUTH0 the useEffect
  // runs and checks to see if the user has data in the server
  //if not the info from AUTh0 is use to create a user's info.
  useEffect(() => {
    if (user) {
      const userInfo = checkAndCreate(user);

      console.log("THIS IS THE POINTS REQUEST", userInfo);
    }
  }, [user]);

  return (
    <Container
      disableGutters={true}
      style={{ border: "solid 4px red" }}
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
        style={{ border: "solid 4px green" }}
        item
        container
      >
        <Grid item style={{ border: "solid 4px yellow" }}>
          <Button
            onClick={() => loginWithPopup()}
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
