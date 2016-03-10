# The coach

![The coach](img/coach.png)

The coach helps you find performance problems on your web page. Think of the coach as a modern version of [YSlow](http://yslow.org/). Yep that's the coach.

## Do my page need coaching?

You know, it's hard to get everything right! The world is complex: HTTP/1 vs HTTP/2. Some of the previous performance best practices are now worst practices. The coach will detect that the page is accessed using HTTP/2, and adjust its' advice accordingly.

One of the coach main goal is to NEVER give you wrong advice. If the coach tells you that something is wrong you should fix that!

## Work in progress!
We know you want the coach to help you but right now YOU need to help the coach! The coach is new and need more advice. Send a [PR](#develop) with a new advice, so the coach gets more knowledge! Check out the [issues](https://github.com/sitespeedio/coach/issues), try the project and give us feedback! In a couple of months we will release 1.0.

## How to use the coach

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

Yes you are right! The coach is a part of the coming [sitespeed.io 4.0](https://www.sitespeed.io) but you can use it your own application or as a standalone tool. We will release a standalone bookmarklet soon.

## The coach gives you advice
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

### Performance
The coach gives you performance advice that will make your page faster.

## The coach gives you extra info
The world is complex, somethings are great to know but hard for the coach to give advice about.

### General information
The coach then just tell you have the page is built and you can yourself draw your own conclusions if something should be changed.

### Timings
The coach got a clock and know how to use it! You will get timing metrics and know if you are doing better or worse than the last run.

# Browser support
The coach is automatically tested in latest Chrome and Firefox. To get best results you need Chrome or Firefox 45 (or later) to be able to know if the server is using HTTP/2.

We hope that the coach work in other browsers but we cannot guarantee it right now.
