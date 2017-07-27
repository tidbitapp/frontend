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


describe('Summarize (not logged in)', () => {

  before(() => driver.get('http://localhost:8080/#/'));

  it('cannot summarize', async () => {
    await driver.wait(until.elementLocated(By.css('#loggedOutMessage')), 5000);
    const divBox = await driver.findElement(
      By.css("#loggedOutMessage")
    );
    expect(
      (await divBox.getText()).indexOf(
        "You must be logged in to request a summary"
      )
    ).to.not.equal(-1);
  });

});
