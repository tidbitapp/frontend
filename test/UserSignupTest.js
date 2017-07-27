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


describe('User Registration', () => {

  before(() => driver.get('http://localhost:8080/#/signup'));

  it('can see first name, last name, username and password inputs', async () => {
    const firstNameBox = await driver.findElement(
      By.css("input[name='firstName']")
    );
    const lastNameBox = await driver.findElement(
      By.css("input[name='lastName']")
    );
    const usernameBox = await driver.findElement(
      By.css("input[name='username']")
    );
    const passwordBox = await driver.findElement(
      By.css("input[name='password']")
    );

    expect(firstNameBox).to.not.be.undefined;
    expect(lastNameBox).to.not.be.undefined;
    expect(usernameBox).to.not.be.undefined;
    expect(passwordBox).to.not.be.undefined;
  });

  it('can sign a user up', async () => {
    const firstNameBox = await driver.findElement(
      By.css("input[name='firstName']")
    );
    const lastNameBox = await driver.findElement(
      By.css("input[name='lastName']")
    );
    const usernameBox = await driver.findElement(
      By.css("input[name='username']")
    );
    const passwordBox = await driver.findElement(
      By.css("input[name='password']")
    );
    const submitButton = await driver.findElement(
      By.css("button[id='signup']")
    );

    await firstNameBox.sendKeys(config.fakeFirstname);
    await lastNameBox.sendKeys(config.fakeLastname);
    await usernameBox.sendKeys(config.fakeUsername);
    await passwordBox.sendKeys(config.fakePassword);
    await submitButton.click();

    await driver.wait(until.elementLocated(By.css('#signupMessage')), 10000);
    const spanBox = await driver.findElement(
      By.css("#signupMessage")
    );
    expect(await spanBox.getText()).to.equal("Success");

    await helpers.canAuthenticate(chai, (res) => {
      expect(res).to.have.status(200);
    });
  });

});
