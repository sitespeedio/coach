# The coach needs your help!

We plan to change <https://run.sitespeed.io/> to use the coach instead. Today we use sitespeed.io 3.0 but the coach is a better match. We got everything ready to do the change except nice result page. The coach need your help with that.

Need to know more about the coach, read it [here](https://github.com/sitespeedio/coach).

Why should you help out? Well except that it's cool to do Open Source you can have your name and link to your page on the result page (as long as it a personal website or a Open Source tool).

You don't need to install everything that is needed for getting run.sitespeed.io up and running, you can create the HTML & CSS locally by parsing the result from the coach. Here's how you do it:

## Prerequisites

You need to have npm/nodejs installed:
<https://nodejs.org/en/download/>

We use jade <http://jade-lang.com/> as the template language.

```bash
npm install jade -g
```

You need Git.

## Run

Clone this repository (open your terminal and run:):

```bash
git clone https://github.com/sitespeedio/coach.git
cd coach/help
```

The package include the current CSS, images, two different result JSON and the jade templates.

You can run it like this:

```bash
jade -w -O ./large.json index.jade
```

This will generate index.html. Open it in your browser and try it out.

## Expectations

@tobli and me have a lot to do to get sitespeed.io 4.0 up and running before the summer. Could we get some help with the styling that would help us a lot.

You can style the element we have today or you can redo the full design. If you need original images, ping us in an issue and we will help you get that.

A couple of things:

* We try to avoid frameworks as they are usually quite heavy.
* We don't need JavaScript to render the page
* There's a lot of information from the coach, specially if you have a site that have a lot of improvements (test large.json). Maybe there's a good way to opt in/out of the detailed information (showing the offending assets)? You are the expert and can help us with that.
