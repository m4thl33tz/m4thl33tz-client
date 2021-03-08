import React, { useEffect, useState } from 'react';
// import LoginButton from '../Form/LoginButton';
// import LogoutButton from '../Form/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import JSONpretty from 'react-json-pretty';
import { Button, Container, NativeSelect, TextField } from '@material-ui/core';


export default function Home() {
  const [type, setType] = useState('addition');
  const [difficulty, setDifficulty] = useState('easy');
  const [problem, setProblem] = useState({});
  const [answer, setAnswer] = useState('');
  const [color, setColor] = useState('');
  const { user, isAuthenticated } = useAuth0();

  console.log(user, isAuthenticated);

  const updateType = ({ target }) => {
    setType(target.value);
  };

  const updateDifficulty = ({ target }) => {
    setDifficulty(target.value);
  };

  const updateAnswer = ({ target }) => {
    setAnswer(target.value);
  };

  const checkAnswer = (event) => {
    event.preventDefault();
    const parsedAnswer = Number(answer);
    console.log(parsedAnswer);

    const isCorrect = parsedAnswer === problem.solution;
    const color = isCorrect ? 'green' : 'red';
    setColor(color);
    return isCorrect;
  };

  const API = `https://mathleetz-staging.herokuapp.com/api/v1/arithmetic/${type}?difficulty=${difficulty}&number=6`;

  const getProblem = () => {
    fetch(API)
      .then((res) => res.json())
      .then((json) => setProblem(json[0]));
  };

  // const mathHTML = problem.compiled || 'Hi!';

  useEffect(() => {
    setColor('');
    setAnswer('');
  }, [problem]);

  return (
    <Container>
      <header>
        Proof of Concept
        {/* <LoginButton />
        <LogoutButton /> */}
        <div>Score: </div>
      </header>
      <Container 
        component="section">
        <Button 
          variant="outlined"
          onClick={getProblem}>
          Random Problem
        </Button>

        <NativeSelect 
          value={type} 
          onChange={updateType}>
          <option aria-label="None" value="" >Operation</option>
          <option value="addition">Addition</option>
          <option value="multiplication">Multiplication</option>
          <option value="subtraction">Subtraction</option>
          <option value="division">Division</option>
        </NativeSelect>

        <NativeSelect value={difficulty} onChange={updateDifficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </NativeSelect>

        <section>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {/* <div
              dangerouslySetInnerHTML={{
                __html: mathHTML,
              }}
            ></div> */}
            <div style={{ height: '200px', width: '300px', border: 'solid 4px purple'}}>
              {problem.equation}
            </div>
            <div
              style={{
                color,
              }}
            >
              {color === 'green' ? 'correct' : 'incorrect'}
            </div>
          </div>
          <form onSubmit={checkAnswer}>
            <TextField
              id="answer"
              type="text"
              label="answer"
              onChange={updateAnswer}
              value={answer}
            />
            <Button 
              variant="contained" 
              color="secondary"
              type="submit">Submit</Button>
          </form>
        </section>
        <div>
          <JSONpretty data={user} />
        </div>
      </Container>
    </Container>
  );
}
