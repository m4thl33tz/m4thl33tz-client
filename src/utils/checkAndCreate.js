export const checkAndCreate = async (user) => {
  //using the /checkUser route and the unique id from auth0
  //this checks to see if the user exists in the server

  let res = await fetch(`http://localhost:7890/checkUser/${user.sub}`);
  let player = await res.json();
  // if the user is new to the site the information from Auth0 is
  //used to make a new user in the server.
  if (!player) {
    res = await fetch('http://localhost:7890/newUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uniqueId: user.sub,
        name: user.given_name + ' ' + user.family_name,
        nickname: user.nickname,
      }),
    });
    player = await res.json();
  }
  return player;
};
