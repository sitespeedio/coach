# The coach

![The coach](img/coach.png)

The coach helps you find performance problems on your web page. Think of the coach as a modern version of [YSlow](http://yslow.org/). The coach will give advice of how your page can be faster.

# TOC
 - [Do my page need coaching?](#do-my-page-need-coaching)
 - [Why we love the coach](#why-we-love-the-coach)
 - [Work in progress](#work-in-progress)
 - [How to use the coach](#how-to-use-the-coach)
    - [Standalone](#standalone)
    - [sitespeed.io 4.0](#sitespeed.io-4.0)
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
Seven reasons why we love the coach:
 - The coach gives you advice how to make your page faster. The coach aims to NEVER give you a false advice. Follow the advice and you will WIN!
 - HTTP/1 or HTTP/2? That's no problem, the coach adjust the advice accordingly.
 - The coach use real browsers to investigate your page exact as your users.
 - Every advice has one or more unit test to make sure it's easy to change advice in the future.
 - The coach knows other things than performance: Accessibility and web best practice are other things that the coach will help you with.
 - You can integrate the coach in your own web performance tool, it easy: Your tool need to be able to run Javascript in the browser and produce a HAR file.
 - The coach is Open Source. The advice is public, you can check them and change them yourself.

## Work in progress!
We know you want the coach to help you but right now YOU need to help the coach! The coach is new and need more advice. Send a PR with a new advice, so the coach gets more knowledge! Check out the [issues](https://github.com/sitespeedio/coach/issues), try the project and give us feedback! In a couple of months we will release 1.0.

## How to use the coach
You can use the coach in a couple of different ways.

### Standalone

You need Node.js 4.3.0 or later to run.

```bash
npm install webcoach -g
webcoach -u http://www.sitespeed.io --browser chrome
```
If you want to use Firefox:
```bash
webcoach -u http://www.sitespeed.io --browser firefox
```

> ... but hey, I only get a back some JSON?

Yes you are right! There's no front end included in the standalone version. More about that later.

### sitespeed.io 4.0

The coach is a part of the coming [sitespeed.io 4.0](https://www.sitespeed.io). It will be realeased this summer, hallelujah!

### Bookmarklet

We also produce a bookmarklet. The bookmarklet only uses advice that you can run inside the browser (it doesn't have HAR file to analyze even though maybe possible in the future with the Resource Timing API).

The bookmarklet is really rough right now and logs the info to the browser console. Help us make a cool frontend :)

### Include in your own tool
The coach has an API so you can easily get hold of the Javascript that you want to run in your browser, analyze a HAR file and merge the result. We need to add more docs about but if you want to start now, checkout index.js.

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
Checkout the [developers guide](docs/develop.MD) to get a better feeling how the coach works.

# Browser support
The coach is automatically tested in latest Chrome and Firefox. To get best results you need Chrome or Firefox 45 (or later) to be able to know if the server is using HTTP/2.

We hope that the coach work in other browsers but we cannot guarantee it right now.
