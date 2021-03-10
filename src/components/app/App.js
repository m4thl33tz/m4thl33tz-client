import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline';

import HomePage from '../../pages/home/HomePage';
import PracticeRoom from '../../pages/practiceroom/PracticeRoom';
import AcademicRoom from '../../pages/academicroom/AcademicRoom';
import SplashPage from '../../pages/splashpage/SplashPage';
import ChooseGame from '../../pages/choosegame/ChooseGame';
import WaitingRoom from '../../slides/waitingroom/WaitingRoom';
import GameTable from '../../slides/gametable/GameTable';

export default function App() {
  const theme = createMuiTheme({
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
          <Route exact path="/" component={SplashPage} />
          <Route path="/practiceroom" component={PracticeRoom} />
          <Route path="/academicroom" component={AcademicRoom} />
          <Route path="/choosegame" component={ChooseGame} />
          <Route path="/waitingroom" component={WaitingRoom} />
          <Route path="/gametable" component={GameTable} />

        </Switch>
      </ThemeProvider>
    </Router>
  );
}
