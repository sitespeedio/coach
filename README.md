![The coach](img/coach.png)

The coach helps you find performance problems on your web page. Think of the coach as a modern version of [YSlow](http://yslow.org/). The coach will give advice of how your page can be faster.

# The coach
 - [Do my page need coaching?](#do-my-page-need-coaching)
 - [Why we love the coach](#why-we-love-the-coach)
 - [Work in progress](#work-in-progress)
 - [How to use the coach](#how-to-use-the-coach)
    - [Standalone](#standalone)
    - [sitespeed.io 4.0](#sitespeedio-40)
    - [Bookmarklet](#bookmarklet)
    - [Include in your own tool](#include-in-your-own-tool)
 - [What do the coach do?](#what-do-the-coach-do)  
 - [How does it all work](#how-does-it-all-work?)
    - [Bonus](#bonus)
    - [Accessibility](#accessibility)
    - [Best practice](#best-practice)
    - [General information](#general-information)
    - [Timings](#timings)
 - [Developers guide](#developers-guide)  
 - [Browser support](#browser-support)    

## Do my page need coaching?

You know, it's hard to get everything right! The world is complex: HTTP/1 vs HTTP/2. Some of the previous performance best practices are now worst practices. The coach will detect that the page is accessed using HTTP/2, and adjust its' advice accordingly.


## Why we love the coach
Nine reasons why we love the coach:
 - The coach gives you advice how to make your page faster. The coach aims to NEVER give you a false advice. Follow the advice and you will WIN!
 - HTTP/1 or HTTP/2? That's no problem, the coach adjust the advice accordingly.
 - The coach use real browsers to investigate your page exact as your users.
 - Every advice has one or more unit test to make sure it's easy to change advice in the future.
 - The coach knows other things than performance: Accessibility and web best practice are other things that the coach can help you with.
 - You can integrate the coach in your own web performance tool, it's easy: Your tool only need to be able to run Javascript in the browser and produce a HAR file. Or you can use the built in functionality of the coach to run the browser.
 - The coach is Open Source. The advice is public, you can check them and change them yourself. Help us make the coach even better!
 - The CLI output is pretty nice, you can configure how much you want to see. Use it as fast way to check the performance of your page.
 - The coach will be part of sitespeed.io 4.0 and it will be awesome!

## Work in progress!
We know you want the coach to help you but right now YOU need to help the coach! The coach is new and need more advice. Send a PR with a new advice, so the coach gets more knowledge! Check out the [issues](https://github.com/sitespeedio/coach/issues), try the project and give us feedback! In a couple of months we will release 1.0.

## How to use the coach
You can use the coach in a couple of different ways.

### Standalone

You need Node.js 4.3.0 or later to run. And you need Firefox and/or Chrome installed.

If you want to use Firefox (Firefox is default):
```bash
webcoach -u http://www.sitespeed.io
```

Try it with Chrome:
```bash
npm install webcoach -g
webcoach -u http://www.sitespeed.io --browser chrome
```

Do also want to show the offending assets and the description of the advice:
```bash
webcoach -u http://www.sitespeed.io --offending --description
```

By default the coach only tells you about advice where you don't get the score 100. You can change that. If you want to see all advice, you can do that too:

```bash
webcoach -u http://www.sitespeed.io --limit 101
```

> ... but hey, I want to see the full JSON?

Yes you can do that!
```bash
webcoach -u http://www.sitespeed.io -o json
```
Will get you the full JSON, the same as if you integrate the coach into your tool.


### sitespeed.io 4.0

The coach is a part of the coming [sitespeed.io 4.0](https://www.sitespeed.io). It will be released this summer, hallelujah!

### Bookmarklet

We also produce a bookmarklet. The bookmarklet only uses advice that you can run inside the browser (it doesn't have HAR file to analyze even though maybe possible in the future with the Resource Timing API).

The bookmarklet is really rough right now and logs the info to the browser console. Help us make a cool front end :)

You can generate the bookmarklet by running

```bash
grunt bookmarklet
```

and then you will find it in the dist folder.

### Include in your own tool
The coach uses Browsertime to start the browser, execute the Javascript and fetch the HAR file. You can use that functionality too inside your tool or you can use the raw scripts if you have your own browser implementation.

#### Use built in browser support

In the simplest version you use the default configuration (default DOM and HAR advice and using Firefox):

```javascript
const api = require('webcoach');

const result = api.run('https://www.sitespeed.io');
```

The full API method:

```javascript
// get the API
const api = require('webcoach');
const result = api.run(url, domScript, harScript, domOptions, harOptions);
```

#### Use the scripts
Say that your tool run on Windows, you start the browsers yourself and you generate your own HAR file. Create your own wrapper to get the coach to help you.

First you need the Javascript advice, you can get the raw script either by generating it yourself or through the API.

Generate the script
```bash
grunt combine
```
and it will be in the dist folder.

Or you just get it from the API:

```javascript
// get the API
const api = require('webcoach');
// get the DOM scripts, it's a promise
const domScriptPromise = api.getDomAdvice();
```

Take the <em>domScript</em> and run it in your browser and take care of the result.

To test the HAR you need to generate the HAR yourself and then run it against the advice.

```javascript
const api = require('webcoach');

// You read your HAR file from disk or however you get hold of it
const harJson = //

// if your har contains multiple pages (multiple runs etc) you can use the API
// to get the page that you want
const firstPageHar = api.pickAPage(harJson, 0);

// the result is a promise
const myHarAdviceResultPromise = api.runHarAdvice(firstPageHar, api.getHarAdvice());

```

When you got the result from both the DOM and the HAR you need to merge the result to get the full coach result:

```javascript
// Say that you got the result from the browser in domAdviceResult
// and the HAR result in harAdviceResult
const coachResult = api.merge(domAdviceResult, harAdviceResult);
```

Now you have the full result (as JSON) as coachResult.

## What do the coach do
The coach will give you advice on how to do your page better. You will also give you a score between 0-100. If you get 100 the page is great, if you get 0 you can do much better!

## How does it all work?

The coach test your site in two steps:
 * Executes Javascript in your browser and check for performance, accessibility, best practice and collect general info about your page.
 * Analyze the [HAR file](http://www.softwareishard.com/blog/har-12-spec/) for your page together with relevant info from the DOM process.

You can run the different steps standalone but for the best result run them together.

## Bonus
The coach doesn't only knows about performance. She also knows about accessibility and web best practice.

### Accessibility
Make sure your site is accessible and useable for every one. You can read more about making the web accessible [here](https://www.marcozehe.de/2015/12/14/the-web-accessibility-basics/).

### Best practice
You want your page to follow best practice right? Making sure your page is setup for search engines, have good URL structure and so on.

### General information
The world is complex, somethings are great to know but hard for the coach to give advice about.

The coach then just tell you have the page is built and you can yourself draw your own conclusions if something should be changed.

### Timings
The coach got a clock and know how to use it! You will get timing metrics and know if you are doing better or worse than the last run.

# Developers guide
Checkout the [developers guide](docs/developers-guide.md) to get a better feeling how the coach works.

# Browser support
The coach is automatically tested in latest Chrome and Firefox. To get best results you need Chrome or Firefox 45 (or later) to be able to know if the server is using HTTP/2.

We hope that the coach work in other browsers but we cannot guarantee it right now.
