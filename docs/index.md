# Make the coach 

Lets make the co

# Table of Content

- [What do I need](#what-do-i-need)
- [DOM vs HAR advice](#DOM-vs-HAR-advice)
	- [DOM advice](#DOM-advice)
	- [HAR advice](#har-advice)
- [Testing HTTP/2 vs HTTP/1](#Testing HTTP/2 vs HTTP/1)
- [Create a new advice]()
- [Test]()
  - [In the browser]()
  - [Add a test case]()


## What do I need
You need to have [Firefox](https://www.mozilla.org/en-US/firefox/new/) & [Chrome](https://www.google.com/chrome/browser/desktop/) installed to be able to run all the tests locally.

Then you need [Node.js](https://nodejs.org/en/],  [npm](https://nodejs.org/en/) and [grunt-cli](http://gruntjs.com/using-the-cli). When you got everything you can clone the project (or rather first fork it and clone your fork).

```
$ git clone git@github.com:sitespeedio/coach.git
```

Inside your coach folder install the dependencies and run the tests to check that everything works:
```
$ npm install
$ grunt test
```
If it works, then you are ready to get started creating new advice for the coach!

## DOM vs HAR advice
The coach analyze a page in two steps: First it executes Javascript in the browser to do the checks that are a perfect fit for Javascript: examine the rendering path, check if images are scaled in the browser etc.

Then the coach take the HAR file from the page and analyze that too. The HAR is good if you want the number of responses, size and cache headers.

Whats missing right now (but we [intend to implement](https://github.com/sitespeedio/coach/issues/13)) is the combination of the two: A HAR advice that takes input from a DOM. This is cool because the the HAR advice can now which requests are done inside if head and render blocking.


### DOM advice

Each DOM advice needs to be a [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) and return an object that holds the data.

```javascript
(function(util) {
 'use strict';
 var offending = [];

 var links = document.getElementsByTagName('link');
 for (var i = 0, len = links.length; i < len; i += 1) {
   if (links[i].media === 'print') {
     offending.push(util.getAbsoluteURL(links[i].href));
   }
 }

 var score = offending.length * 10;

 return {
   id: 'cssPrint',
   title: 'Do not load print stylesheets, use @media type print instead',
   description: 'Loading a specific stylesheet for printing slows down the page, even though it is not used',
   advice: offending.length > 0 ? 'The page has ' + offending.length + ' print stylesheets.':'',
   score: Math.max(0, 100 - score),
   weight: 1,
   offending: offending,
   tags: ['performance', 'css']
 };

})(util);
```

What you can do is just copy/paste your advice and run it in your browser. If you use the [utility methods](https://github.com/sitespeedio/coach/blob/master/lib/dom/util.js)  you need to copy/paste that too inside your browser console before you test your advice.

When you create a new advice you also need to create automatic tests for it. We run the tests in both Firefox & Chrome.

We create a new unique HTML page for each rule (or two if you want to test different behavior).

A simple test run for the print CSS advice looks like this:

```javascript
it('We should find out if we load an print CSS', function() {
  return bt.run(path + 'cssPrint.html', 'lib/dom/performance/cssPrint.js')
    .then((result) => {
      assert.strictEqual(result.offending.length, 1);
    });
});
```

Right now all these tests run in https://github.com/sitespeedio/coach/blob/master/test/dom/performance/indexTest.js

### HAR advice
We use snufkin (https://github.com/sitespeedio/snufkin) that takes a HAR file and converts it to easier to use format. If something is missing from the Page object get from snufkin, send a PR and we will add it.

Each advice will be called with the processPage function.

```javascript
'use strict';
let util = require('../util');

module.exports = {
  id: 'pageSize',
  title: 'Total page size shouldn\'t be too big',
  description: 'Avoid having pages that have transfer size over the wire of more than 2 MB because that is really big and will hurt performance. ',
  weight: 3,
  tags: ['performance','server','mobile'],
  processPage: function(page) {
    if (page.transferSize > 2000000) {
      return {score: 0, offending: [], advice:'The page total transfer size is ' + util.formatBytes(page.transferSize) + ', which is more than the recommended 2 MB. That is really big and you should check what you can do to make it smaller'};
    }
    return {score: 100, offending: [], advice:''};
  }
};
```

## Testing HTTP/2 vs HTTP/1
Both DOM and HAR advice have help methods that will help

DOM:
```javascript
if (util.isHTTP2()) {
  // special handling for H2 connections
}
```
HAR
```javascript
if (util.isHTTP2(page)) {
  // special handling for H2 connections
}
```

# Add a new advice
The coach is new and need more advice. Send a PR with a new advice, so the coach gets more knowledge! When you add a new advice you test it in your browser and create a test case in the project. Then send a PR.

## The structure of an advice


```javascript
return {
  id: 'uniqueid', // a uniqie id
  title: 'The title of the advice',
  description: 'More information of the advice',
  advice: 'Information of what the user should do to fix the problem',
  score:  100, // a number between 0-100, 100 means the page don't need any advice
  weight: 5, // a number between 0-10, how important is this advice in this category? 10 means super important
  offending: [], // an array of assets that made the score less than perfect
  tags: ['accessibility','html']
};
```

Advice based on a HAR follows the same structure. The result from the DOM and the HAR is merged.

## Test in your browser
You can and should test your advice in your browser. It's easy. Just copy paste the Javascript code and run it in the console of your browser. If you make rules and want to use our [utility methods](blob/master/lib/dom/util.js) (that contains some help methods), just copy/paste the util object to your browser and then run your rule.

## Add a test case
Each test case runs against a specific HTML page located in [test/http-server](test/http-server)  Create a suitable HTML page with the structure you want to test. Create the test case in  [test/dom](test/dom) or [test/har](test/har) and run it with <code>grunt test</code>

## Test your changes against a web page
The coach uses Browsertime as runner for browsers. When you done a change, make sure to build a new version of the combined Javascript and then test agains a url.

```bash
grunt
bin/index.js https://www.sitespeed.io firefox
```

# Add a new category
We have accessibility best practice, performance, and info today. Do the coach need to know something else? Let us know and we can create that category (it's as easy as create a new folder) and we can start add new advice there.
