const jwtDecode = require('jwt-decode');
const config = require('./config');

module.exports.canAuthenticate = async (chai, expectations) => {
  await chai
    .request(config.backendApiServerUrl)
    .post('/authenticate')
    .send({username: config.fakeUsername, password: config.fakePassword})
    .then((res) => {
      expectations(res);
      const jwtToken = res.body.data;
      const userId = jwtDecode(jwtToken)['user_id'];

      return chai
        .request(config.backendApiServerUrl)
        .delete(`/user/${userId}`)
        .set('Authorization', `Bearer ${jwtToken}`);
    })
    .catch((err) => {
      expectations(err);
      throw err;
    });
};

module.exports.createThenDeleteUser = async (chai, promiseExec, userObject) => {
  if (!userObject) {
    userObject = {
      username: config.fakeUsername,
      password: config.fakePassword,
      firstName: config.fakeFirstname,
      lastName: config.fakeLastname
    }
  }

  await chai
    .request(config.backendApiServerUrl)
    .post('/user/')
    .send(userObject)
    .then(async (res) => {
      await promiseExec;

      const jwtToken = res.body.data;
      const userId = jwtDecode(jwtToken)['user_id'];

      return chai
        .request(config.backendApiServerUrl)
        .delete(`/user/${userId}`)
        .set('Authorization', `Bearer ${jwtToken}`);
    })
    .catch((err) => {
      throw err;
    });
};
