const jwtDecode = require('jwt-decode');
const config = require('./config');

module.exports.canAuthenticate = async (chai, expectations) => {
  await chai
    .request(config.backendApiServerUrl)
    .post('/authenticate')
    .send({username: config.fakeUsername, password: config.fakePassword})
    .then(async (res) => {
      const jwtToken = res.body.data;
      const userId = jwtDecode(jwtToken)['user_id'];

      await chai
        .request(config.backendApiServerUrl)
        .delete(`/user/${userId}`)
        .set('Authorization', `Bearer ${jwtToken}`);
      expectations(res);
    })
    .catch((err) => {
      expectations(err);
      throw err;
    });
};

module.exports.createThenDeleteUser = (chai, promiseFunc, userObject) => {
  if (!userObject) {
    userObject = {
      username: config.fakeUsername,
      password: config.fakePassword,
      firstName: config.fakeFirstname,
      lastName: config.fakeLastname
    }
  }

  return chai
    .request(config.backendApiServerUrl)
    .post('/user')
    .send(userObject)
    .then(async () => {
      await promiseFunc();

      const res = await chai
        .request(config.backendApiServerUrl)
        .post('/authenticate')
        .send({
          username: userObject.username,
          password: userObject.password
        });
      const jwtToken = res.body.data;
      const userId = jwtDecode(jwtToken)['user_id'];
      await chai
        .request(config.backendApiServerUrl)
        .delete(`/user/${userId}`)
        .set('Authorization', `Bearer ${jwtToken}`);
    })
    .catch(async (err) => {
      const res = await chai
        .request(config.backendApiServerUrl)
        .post('/authenticate')
        .send({
          username: userObject.username,
          password: userObject.password
        });
      const jwtToken = res.body.data;
      const userId = jwtDecode(jwtToken)['user_id'];

      await chai
        .request(config.backendApiServerUrl)
        .delete(`/user/${userId}`)
        .set('Authorization', `Bearer ${jwtToken}`);
      throw err;
    });
};
