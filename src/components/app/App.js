import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline';

import HomePage from '../home/HomePage';
import PracticeRoom from '../practiceroom/PracticeRoom';
import BriefingRoom from '../briefingRoom/BriefingRoom';

export default function App() {
  const [socket, setSocket] = useState(null);

  let theme = createMuiTheme({
    typography: {
      fontFamily: 'sans-serif',
    },
    palette: {
      primary: {
        light: '#6ec5ff',
        main: '#2195f2',
        dark: '#0068bf',
      },
      secondary: {
        light: '#be9c91',
        main: '#8d6e63',
        dark: '#5f4339',
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseLine />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/briefing" component={BriefingRoom} />
          <Route path="/practiceroom" component={PracticeRoom} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
