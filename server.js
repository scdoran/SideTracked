// Dependencies:

// Snatches HTML from URLs
var request = require('request');
// Scrapes our HTML
var cheerio = require('cheerio');

// Make a request call to grab the HTML body from the site of your choice
request('https://www.facebook.com/pg/sidetrackedtaproom/posts', function (error, response, html) {

	// Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var result = [];

  // Select each instance of the HTML body that you want to scrape
  // NOTE: Cheerio selectors function similarly to jQuery's selectors, 
  // but be sure to visit the package's npm page to see how it works
  $('div').each(function(i, element){

    // var link = $(element).children().attr("href");
    var post = $(element).children().attr("._5pbx userContent");

    // Save these results in an object that we'll push into the result array we defined earlier
    result.push({
      post: post,
      // link: link
    });
  });
  console.log(result);
});
