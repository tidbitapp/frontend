const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

const config = require('./config');
const helpers = require('./helpers');

const sw = require('selenium-webdriver');
const driver = config.driver;
const By = sw.By;
const until = sw.until;


describe('User Login', () => {

  before(() => driver.get('http://localhost:8080/#/login'));

  it('can see username and password inputs', async () => {
    const usernameBox = await driver.findElement(
      By.css("input[name='username']")
    );
    const passwordBox = await driver.findElement(
      By.css("input[name='password']")
    );

    expect(usernameBox).to.not.be.undefined;
    expect(passwordBox).to.not.be.undefined;
  });

  it('can log a user in', async () => {
    await helpers.createThenDeleteUser(chai, async () => {

      const usernameBox = await driver.findElement(
        By.css("input[name='username']")
      );
      const passwordBox = await driver.findElement(
        By.css("input[name='password']")
      );
      const submitButton = await driver.findElement(
        By.css("button[id='login']")
      );

      await usernameBox.sendKeys(config.fakeUsername);
      await passwordBox.sendKeys(config.fakePassword);
      await submitButton.click();

      await driver.wait(until.elementLocated(By.css('#signupMessage')), 10000);
      const spanBox = await driver.findElement(
        By.css("#loginMessage")
      );
      expect(await spanBox.getText()).to.equal("Success");
    });
  });

});
