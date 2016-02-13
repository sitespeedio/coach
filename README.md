# The coach

![The coach](img/coach.png)

The coach helps you find problems on your web page.

## Work in progress!
We know you want the coach to help you but right now YOU need to help the coach! The project is not ready for release yet and you can help us: Check out the [issues](https://github.com/sitespeedio/coach/issues), try the project and give us feedback!

## Do my page need coaching?

It's hard to get everything right. Creating a web page and following best practice rules. The coach can help you! The coach helps you make sure your page is accessible, follows web best practice and is as fast as it can be.

Using HTTP/2 some of the previous performance best practices are now worst practices. The coach will detect (in supported browsers) that the page is accessed using HTTP/2, and adjust its' advice accordingly.

One of the coach main goal is to NEVER give you wrong advice. If the coach tells you that something is wrong you should fix that!

## How to run

```bash
npm install webcoach -g
webcoach -u http://www.sitespeed.io --browser chrome
```
If you want to use Firefox:
```bash
webcoach -u http://www.sitespeed.io --browser firefox
```

## The coach gives you advice
The coach will give you advice on how to do your page better. You will also give you a score between 0-100. If you get 100 the page is great, if you get 0 you can do much better!

### Accessibility
Make sure your site is accessible and useable for every one. You can read more about making the web accessible [here](https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/).

### Best practice
You want your page to follow best practice right? Making sure your page is setup for search engines, have good URL structure and so on.

### Performance
The coach gives you performance advice that will make your page faster.

## The coach gives you extra info
The world is complex, somethings are great to know but hard for the coach to give advice about.

### General information
The coach then just tell you have the page is built and you can yourself draw your own conclusions if something should be changed.

### Timings
The coach got a clock and know how to use it! You will get timing metrics and know if you are doing better or worse than the last run.

## How does it all work?

The coach test your site in two steps:
 * Executes Javascript in your browser and check for performance, accessibility, best practice and collect general info about your page.
 * Analyze the [HAR file](http://www.softwareishard.com/blog/har-12-spec/) for your page together with relevant info from the DOM process.

You can run the different steps standalone but for the best result run them together.

The coach is a part of the coming [sitespeed.io 4.0](https://www.sitespeed.io) but you can use it your own application or as a standalone tool. We will release a standalone bookmarklet soon.

# Browser support
The coach is automatically tested in Chrome and Firefox. To get best results you need Chrome or Firefox 45 (in beta with Resource Timing v2 support, release the 8 of March) to be able to know if the server is using HTTP/2.

We hope that the coach work in other browsers but we cannot guarantee it right now.

# Develop
To help develop the coach you need to install grunt-cli:

```
  npm install -g grunt-cli
```

And have both Chrome and Firefox installed locally so you can run the test by:
```
  grunt test
```


# Add a new advice
The coach is new and need more advice. Send a PR with a new advice, so the coach gets more knowledge! When you add a new advice you test it in your browser and create a test case in the project. Then send a PR.

## The structure of an advice

Each advice needs to an [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) and return an object with the following structure:

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
