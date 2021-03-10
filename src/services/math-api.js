export const getProblems = ({ type, difficulty }) => {
  return fetch(
    `https://mathleetz-staging.herokuapp.com/api/v1/arithmetic/${type}?difficulty=${difficulty}&number=6`
  )
    .then(res => res.json());
};
