var config = require('../../nightwatch.conf.js');
var path = require('path');
var fileConf = require('./fileConf.json');

var randomStr = function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

module.exports = { // addapted from: https://git.io/vodU0
  '@tags': ['deepDreamGenerator'],
  'Generate Deep Style Image': function(browser) {

    //Fetch the url and wait for browser to complete loading
    for(var count = 1; count < 2; count++){

    browser.url('https://deepdreamgenerator.com/sign-up')
    .waitForElementVisible('body', 2000);

    let email = randomStr() + '@gmail.com';
    let password = 'foobar';
    console.log("Email: " + email);
    console.log('Password: '+ password);

    // Login with username and password
    browser.setValue('input[type=text]', ['FooBar', browser.Keys.ENTER]);
    browser.setValue('input[type=email]', [email, browser.Keys.ENTER]);
    browser.setValue('input[type=password]', [password, browser.Keys.ENTER]);

    // Click on styles link
    browser.useXpath()
           .click('/html/body/div[1]/div/div/div[4]/div/div/ul/li[1]/a');

   browser.click('//*[@id="collapse-styles"]/div/div/div/div[2]/label/div[1]/i');

    // Upload a base image
    browser.setValue('//*[@id="image-for-dream"]', path.resolve(__dirname + '/' + fileConf.image_dir + '/' + fileConf.image_name + count + fileConf.extension));

    // Upload style image
    browser.setValue('//*[@id="style-image"]', path.resolve(__dirname + '/' + fileConf.style_dir + '/' + fileConf.style_name + count + fileConf.extension));

    // Generate image
    browser.click('//*[@id="generator-form"]/button');

    // Wait for Download button to be visible
    browser.waitForElementVisible('/html/body/div[1]/div/div/div[4]/div[1]/a[1]', 100000000);
    // Click download button
    browser.click('/html/body/div[1]/div/div/div[4]/div[1]/a[1]');
    browser.pause(5000);
    // Close the browser
    //
    }
    browser.end();
  }
};
