import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline';

import HomePage from '../home/HomePage';
import PracticeRoom from '../practiceroom/PracticeRoom';
import AcademicRoom from '../academicroom/AcademicRoom';

export default function App() {
  let theme = createMuiTheme({
    typography: {
      fontFamily: 'sans-serif',
    },
    palette: {
      primary: {
        light: '#9a67ea',
        main: '#673ab7',
        dark: '#320b86',
      },
      secondary: {
        light: '#ffa270',
        main: '#ff7043',
        dark: '#c63f17',
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseLine />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/practiceroom" component={PracticeRoom} />
          <Route path="/academicroom" component={AcademicRoom} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
