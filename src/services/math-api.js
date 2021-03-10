export const getProblems = ({ type, difficulty }) => {
  return fetch(
    `https://math-problems-staging.herokuapp.com/api/v1/arithmetic/${type}?difficulty=${difficulty}&number=10`
  )
    .then(res => res.json());
};
