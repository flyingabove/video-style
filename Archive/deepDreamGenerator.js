var config = require('../../nightwatch.conf.js');
var path = require('path');

module.exports = { // addapted from: https://git.io/vodU0
  '@tags': ['deepDreamGenerator'],
  'Generate Deep Style Image': function(browser) {

    //Fetch the url and wait for browser to complete loading
    browser.url('https://deepdreamgenerator.com/login')
    .waitForElementVisible('body', 1000);

    //Login with username and password
    browser.setValue('input[type=email]', ['foobar@gmail.com', browser.Keys.ENTER]);
    browser.setValue('input[type=password]', ['foobar', browser.Keys.ENTER]);

    console.log(path.resolve(__dirname + '/sample1.png'));

    // Click on styles link
    browser.useXpath()
           .click('/html/body/div[1]/div/div/div[4]/div/div/ul/li[1]/a');

   browser.click('//*[@id="collapse-styles"]/div/div/div/div[2]/label/div[1]/i');

    // Upload a base image
    browser.setValue('//*[@id="image-for-dream"]', path.resolve(__dirname + '/sample.png'));

    // Upload style image
    browser.setValue('//*[@id="style-image"]', path.resolve(__dirname + '/style.png'));

    // Generate image
    browser.click('//*[@id="generator-form"]/button');

    // Wait for Download button to be visible
    browser.waitForElementVisible('/html/body/div[1]/div/div/div[4]/div[1]/a[1]', 10000000);
    // Click download button
    browser.click('/html/body/div[1]/div/div/div[4]/div[1]/a[1]');
    // Close the browser
    browser.end();
  }
};


// browser.waitForElementNotVisible('/html/body/div[1]/div/div/div[5]/div[4]', 100000);
