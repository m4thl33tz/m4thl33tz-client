const URL = "http://localhost:7890";

// export const checkAndCreate = async (user) => {
//   //using the /checkUser route and the unique id from auth0
//   //this checks to see if the user exists in the server

//   const res = await fetch(`${URL}/checkUser/${user.email}`);
//   console.log("THIS IS RES", res);
//   let player = res.json();
//   // if the user is new to the site the information from Auth0 is
//   //used to make a new user in the server.
//   if (res.statusText.includes("Not Found")) {
//     player = await addPlayer(user);
//     await addNewPoints(user.email);
//   }
//   const points = await findPointsByEmail(user.email);
//   return { player, points };
// };

export const checkUser = async (user) => {
  const res = await fetch(`${URL}/user/checkUser/${user.email}`);
  return res?.json();
};

export const addPlayer = async ({
  email,
  given_name,
  family_name,
  nickname,
}) => {
  const res = await fetch(`${URL}/user/newUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      name: given_name + " " + family_name,
      nickname,
    }),
  });
  const player = await res.json();
  return player;
};

export const addNewPoints = async ({ email }) => {
  const points = await fetch(`${URL}/points/newPoints`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
    }),
  });
  console.log(points);
  return points.json();
};

export const addPoints = async (email, points) => {
  const updatePoints = await fetch(`${URL}/points/addPoints`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      points,
    }),
  });
  console.log(updatePoints);
  return updatePoints.json();
};

export const findAllPoints = async () => {
  const points = await fetch(`${URL}/points/getAll`).then((res) => res.json());
  return points;
};

export const findPointsByEmail = (email) => {
  return fetch(`${URL}/getPlayerPoints/${email}`).then((res) => res.json());
};
