const sw = require('selenium-webdriver');
const driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.safari())
  .build();

module.exports = exports = {
  fakeUsername: "abcdefghij",
  fakePassword: "abcdefghij",
  fakeFirstname: "abcdefghij",
  fakeLastname: "abcdefghij",
  backendApiServerUrl: "http://localhost:8000",
  driver: driver
};
