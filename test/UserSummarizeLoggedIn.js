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


describe('User Summarize (logged in)', () => {

  before(() => driver.get('http://localhost:8080/#/login'));

  it('can summarize', () => helpers.createThenDeleteUser(chai, async () => {

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

      await driver.wait(until.elementLocated(By.css('#loginMessage')), 5000);
      const spanBox = await driver.findElement(
        By.css("#loginMessage")
      );
      expect(await spanBox.getText()).to.equal("Success");

      await driver.get('http://localhost:8080/#/');

      const urlBox = await driver.findElement(
        By.css("input[name='url']")
      );
      const dropdownBox = await driver.findElement(
        By.css("input[name='algorithm']")
      );
      const summarizeButton = await driver.findElement(
        By.css("button#summarize")
      );

      await urlBox.sendKeys("https://github.com");
      await dropdownBox.sendKeys("LUHN");
      await summarizeButton.click();

      await driver.wait(until.elementLocated(By.css('#summarizeMessage')), 5000);
      const summarizeMessageBox = await driver.findElement(
        By.css("#summarizeMessage")
      );
      expect(await summarizeMessageBox.getText()).to.equal("Success");

      await driver.wait(until.elementLocated(By.css("button[id='logout']")), 5000);
      const logoutButton = await driver.findElement(
        By.css("button[id='logout']")
      );
      await logoutButton.click();
    })
  );

});
