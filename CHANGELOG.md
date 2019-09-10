# CHANGELOG - webcoach

## 4.0.0 - 2019-09-10
### Fixed
* Updated dependencies to latest.

### Changed
* Smarter strictTransportSecurityHeader advice that looks for setting subDomains and long max age (>6 month) [#336](https://github.com/sitespeedio/coach/pull/336).
* Third party privacy now uses the third-party-web project to categorise third party requests. There is also a new third party info section that where you can see which tools and category of tools that are used [#335](https://github.com/sitespeedio/coach/pull/335).
* Moved CSP advice to be under privacy instead of best practice [#337](https://github.com/sitespeedio/coach/pull/337).

### Added
* Upgraded to Browsertime 6.0.0 and latest Chrome and Firefox.

## 3.6.0 - 2019-06-10
### Added
* Bumped to Browsertime 5.2.1, Chrome 75 and Chromedriver 75.

## 3.5.7 -  2019-06-01
### Fixed
* Bumped all dependencies to latest, including Browsertime 5.1.3.

## 3.5.6 - 2019-05-27
### Fixed
* Weight of the advice privacy surveillance was broken. Fixed now + typeo fix.

## 3.5.0 - 3.5.5 2019-05-26
### Fixed
* Upgraded to PageXray 2.5.7.

### Added
* Make sure that surveillance companies doesn't get a high privacy score [#332](https://github.com/sitespeedio/coach/pull/332).
* Upgraded to Firefox 67 in the Docker container.

## 3.4.3 2019-05-23
### Fixed
* Don't categorise defer JavaScript as render blocking in the fast render advice.

## 3.4.2 2019-05-19
### Fixed
* Upgraded to Browsertime 5.0.0

## 3.4.1 2019-05-05
### Fixed
* Upgraded to Firefox 66.0.4 in the Docker container that fixes the problems with extensions.

## 3.4.0 2019-04-24
### Added
* Upgraded to Chrome 74 and Browsertime 8.14.0

## 3.3.0 2019-02-19
### Added
* Upgraded to Chrome 73 and Firefox 66 in the Docker container
* Upgraded to Browsertime 4.5.0 to get the latest Chromedriver

## 3.2.1 2019-02-08
### Fixed
* Upgrade to latest Browsertime 4.2.6

## 3.2.0 2019-02-01
### Added
* Upgraded to Chrome 72 and Firefox 65 in the Docker container. 
* Upgraded to latest Browsertime

## 3.1.1 2019-01-23
* Upgraded to latest Browsertime
* Fix if the firstParty regex don't match any requests [#326](https://github.com/sitespeedio/coach/pull/326)

## 3.1.1 - 2019-01-21
* Upgraded to stable Browsertime 4.0.0 with a fix for removing the trace log.

## 3.1.0 - 2019-01-21
* Updated to beta 3 of Browsertime 4.0. This will make the trace log from Chrome appear in a new file structure ... but let us fix that in later releases.

## 3.0 - 2018-10-20
Read all about the release at [https://www.sitespeed.io/coach-3.0/](https://www.sitespeed.io/coach-3.0/).

### Added
* Docker and npm version now using latest LTS of NodeJS 10.13.0 [#307](https://github.com/sitespeedio/coach/pull/307).
* There's now a check for reporting if the page use service workers. If the page use a service worker, the worker JavaScript file is returned [#308](https://github.com/sitespeedio/coach/pull/308).
* Upgraded to Browsertime 3.12.0.
* New headers check: Avoid long response headers, avoid too many headers and avoid headers that unnecessary [#310](https://github.com/sitespeedio/coach/pull/310),
* Check for referrer-policy and strict-transport-security HTTP headers [#311](https://github.com/sitespeedio/coach/pull/311).
* If you run Chrome we will now test against too much time spent in scripting or rendering for the CPU [#313](https://github.com/sitespeedio/coach/pull/313).
* Look for CSP header [#315](https://github.com/sitespeedio/coach/pull/315).
* Added first/third party support [#316](https://github.com/sitespeedio/coach/pull/316).
* There's a first/third party advice that will warn about too high usage of third parties [#317](https://github.com/sitespeedio/coach/pull/317).
* We have a new advice category: privacy [#321](https://github.com/sitespeedio/coach/pull/321).

### Changed
* We have removed Bluebird and uses native Promises and async/await where possible. It could be the case of that we leaked Bluebird promises before, but that is fixed now [#304](https://github.com/sitespeedio/coach/pull/304).

* HAR advice can now use whatever category we want (before HAR advice was only performance advice). [#309](https://github.com/sitespeedio/coach/pull/309). There's one change to the API that isn't backward compatible. In the new version the getHarAdvice return a structure ```{category: [advice]}``` instead of (the old) ```[advice]```. It now has the same structure as DOM advice.

### Fixed
* Recommendation for H2 said that H2 always was faster [#269](https://github.com/sitespeedio/coach/issues/269). That's not always true [#319](https://github.com/sitespeedio/coach/pull/319).

* Renamed Piwik to Matomo (and checking for both versions as info).

### Tech
* Bumped versions of dependencies [#318](https://github.com/sitespeedio/coach/pull/318).

## 2.4.0 - 2018-10-24

### Added
* Upgraded to Browsertime 3.11.1
* Upgraded Docker to use Chrome 70 and Firefox 63  

## 2.3.0 - 2018-10-07

### Fixed
* Fixed optimal CSS advice that could be lower than zero [#298](https://github.com/sitespeedio/coach/pull/298).
* Running with --mobile displayed undefined as undefined browser [#299](https://github.com/sitespeedio/coach/pull/299).
* Catching Browsertime errors and throwing them. Thanks you [Jadon N](https://github.com/jadonn) for the PR [300](https://github.com/sitespeedio/coach/pull/300).

### Added 
* Upgraded to Browsertime 3.7.1
* Updated to PageXray 2.4.0

## 2.2.0 - 2018-09-15
### Added
* Upgraded to Browsertime 3.5.0

## 2.1.0 - 2018-09-13
### Added
* Upgraded to Chrome 69 and Firefox 62  in the Docker container
* Use Browsertime 3.4.1

## 2.0.6 - 2018-07-15
### Fixed
* Upgraded to Browsertime 3.2.1

## 2.0.5 - 2018-06-30
### Fixed
* Added Browsertime 3.2.0

## 2.0.4 - 2018-06-25
### Fixed
* Updated Docker dependencies so downloaded files are remove -> smaller Docker file. Thanks [@sodabrew](https://github.com/sodabrew) for the PRs.
* Made the pick a HAR api faster [#293](https://github.com/sitespeedio/coach/issues/293).
* Use Firefox 67 stable.
* Use Browsertime 3.1.4

## 2.0.3 - 2018-05-12
### Fixed
* Oooops old reference to Chrome beta, thanks @sodabrew for the PR [#290](https://github.com/sitespeedio/coach/pull/290).

## 2.0.2 - 2018-05-12
### Fixed
* Even more chrome.loadTimes removed from RUMSpeedIndex and updated Browsertime that also has the same change.

## 2.0.1 - 2018-05-12
### Fixed
* Updated RUMSpeedIndex to not use chrome.loadTimes.

## 2.0.0 - 2018-05-12
### Added
*  Upgraded to Browsertime 3.0.0 and Chrome 66 and Firefox 61 Beta

### Changed
* Browsertime 3.0 doesn't pass on the screenshot so if you use --screenshot it will now be stored as screenshot/1.png in your current dir.

### Fixed
* Changed the use of the old deprecated loadTimes for Chrome.

## 1.3.1 - 2018-04-25
### Fixed
* Upgraded to Browsertime 2.4.0
* Upgraded to PageXray 2.2.2

## 1.3.0 - 2018-03-20
### Added
* Bumped PageXray to 2.2.0
* The Coach now run headless by default!
* When you use Firefox you need version 60 or later to get all the advice. Add --firefox.beta or --firefox.nightly as extra CLI params (on Mac). Docker uses FF 61.
* Updated Docker to use Firefox 61 (nightly) and Chrome 66 (beta).

## 1.2.0 - 2018-01-24

### Added
* Do you use 3rd party content from Facebook?

### Fixed
* Upgraded to PageXray 2.0.4
* Upgraded to Browsertime 2.1.4

## 1.1.2 - 2017-12-28
### Fixed
* Upgraded to PageXray 2.0.2.

## 1.1.1 - 2017-12-19

### Fixed
- Upgraded PageXray to 2.0.1 that fixes Chrome problem with URLs containing hashes
- Upgraded to Browsertime 2.1.2 with Chromedriver 2.34

## 1.1.0 - 2017-11-23

### Added
- Upgraded to Browsertime 2.0.0

## 1.0.0 - 2017-10-28

### Changed
- Just output version number on --version, not the package name
- Upgraded the Docker file to follow the same pattern as the rest of the sitespeed.io projects
- Upgraded to NodeJS 8.9.0 (latest LTS)
- Always prefer CSS inlining.
- Use Navigation Timings 2 to detect connection type.

### Added
- The Coach now give you advice on Google Analytics and Google Tag Manager [#275](https://github.com/sitespeedio/coach/pull/275).
- Added new third party lib check: GA, GTM, New Relic, Boomerang, JQuery, Piwik (so far).
- Added new check for JavaScript frameworks.
- Show effective network type for browsers that support it.

## 0.38.0 2017-10-14
### Added
- Updated to Browsertime 1.9.5

## 0.37.0 2017-08-26
### Added
- Updated to PageXray 1.0.0 and Browsertime 1.6.1

## 0.36.0 2017-08-03
### Added
- Updated to Browsertime 1.6.0 and upgraded the Docker container to use Firefox 54 and Chrome 60 (stable)

## 0.35.0 2017-07-22
### Added
- Updated to Browsertime 1.5.4 and upgraded the Docker container to use Firefox 54 and Chrome 60 Beta
- Set NodeJS to 6.11.1 or higher

## 0.34.1 2017-05-11
### Added
- Updated to latest Browsertime 1.2.2.

## 0.34.0 2017-04-23
### Added
- Updated to latest Browsertime 1.1.0. Also use latest FF & Chrome in Docker.

## 0.33.0 2017-04-07
### Added
- Updated to latest Browsertime 1.0.0, finally no beta. Also use latest FF in Docker.

## 0.32.0 2017-03-14
### Added
- Newest browsertime with support for Chrome 57. Updated Dockerfile to use Firefox 52 and Chrome 57.

## 0.31.0 2017-02-10
### Changed
- Removed User Timing performance advice: If you don't use user timings, you shouldn't get lower score. See how this was broken https://github.com/sitespeedio/browsertime/issues/257 [#148](https://github.com/sitespeedio/coach/issues/148)

### Added
- Collect number of script tags as info.
- Updated to Browsertime beta-24

## 0.30.4 2017-01-10
### Added
- Updated to latest Browserime beta-23

## 0.30.3 2017-01-10
### Added
- Updated to latest Browserime beta-22

## 0.30.2 2017-01-10
### Added
- Updated to latest Browserime beta-21

## 0.30.1 2017-01-04
### Added
- Updated to latest Browserime beta-19

## 0.30.0 2016-12-12
### Added
- Add --viewPort option to set browser window size for test, thank you @jsocol for the PR

- New advice "Avoid using incorrect mime types" thank you @lbod #204

- New Browsertime and PageXray

## 0.29.0 2016-11-11
### Changed
- Updated NodeJs dependency to be 6.9.1 (needed when we start to use Selenium 3.0.0)

### Added
-  Updated to latest Browserime beta-10 with Selenium 3.0.1. You now need NodeJS 6.9.0

## 0.28.4 2016-10-26
### Added
- Updated to latest Browserime beta-9

## 0.28.3 2016-10-26
### Fixed
- Fix the labelOnInput advice (thanks @simonc!)

### Added
- Updated to latest Browserime beta-8

## 0.28.2 2016-10-17
### Fixed
- Now we have the latest beta-7 of Browsertime

## 0.28.0 2016-10-17
### Added
- New info: get meta description
- Updated PageXray and Browsertime to latest releases.

## 0.27.1 2016-09-29
### Fixed
- Fixed crash for pages where the 'last-modified' header is missing.

## 0.27.0 2016-09-23
### Added
- Updated to Browsertime beta 5 with fix for Firefox 49
- Updated to PageXray 0.13.0 to get the amount of uncompressed assets.

## 0.26.0 2016-09-19
### Added
- Updated PageXray to 0.12.0 so we shows cookies for a page (or rather min/max for all responses).
- Added serializedDomSize as info.
- Updated to Browsertime beta 4

## 0.25.0 2016-09-02
### Changes
- Updated PageXray to 0.10.0 so we now shows total number of domains on a page.
- Updated to Browsertime beta 3

## 0.24.6 2016-08-30
### Changes
- Updated Browsertime to be beta 2

## 0.24.5 2016-08-16
### Fixed
- Updated browsertime with fix for right Geckodriver and Chromerdriver on Mac

## 0.24.4 2016-08-16
### Fixed
- Updated browsertime with latest version of TSProxy that works with http -> https for Chrome.

## 0.24.3 2016-08-11
### Fixed
- Updated Browsertime to latest version that uses latest Selenium and Geckodriver that works with Firefox 48. If you are using Windows, you need to make sure you out Geckodriver in your path.

## 0.24.2 2016-06-28
### Fixed
- Updated Browsertime to latest version that uses lates Selenium that works with Firefox 47.0.1

## 0.24.1 2016-06-28
### Fixed
- Better description for all performance advice, lets try to explain them so people can undrstand them.

## 0.24.0 2016-06-14
- Bump for fixing broken release.

## 0.23.0 2016-06-14
### Added
- You can now get CLI output without colors, thank you https://github.com/bronzehedwick
- Run Selenium scripts before you test a page (=login the user). Documentation will come, until then
  have a look at this example: https://github.com/tobli/browsertime/blob/1.0/test/prepostscripts/preLoginExample.js

### Changed
- Show exact size in bytes for optimalCssAdvice
- Check for cache time >= 30 days instead of month, to make it cleaner and more
understandable.
- Use Chrome as default browser since Firefox 47, Selenium, Marionette and the HAR Export trigger isn't compatible by default see https://github.com/sitespeedio/sitespeed.io/issues/993

### Fixed
- Break new lines in CLI output with \n instead of EOL, EOL didn't work on
Windows. Thank you @XhmikosR for the PR.

## 0.22.4 2016-05-29
### Changed
- Chrome 51 is here and SPDY is dropped, the SPDY advice is updated.
- Internal: Converted a few function to ES6 short syntax

## 0.22.3 2016-05-20
### Added
- Upgraded PageXray to 0.9.0 and Browsertime to alpha 18(!)


## 0.22.2 2016-05-16
### Fixed
- Correction of date when Chrome drops SPDY support (when 51 is released)
- Bumped dependencies for Browsertime and PageXray

## 0.22.1 2016-05-12

### Fixed
- Always check for window.chrome and window.chrome.loadTimes before we know that we are using chrome (yep, there are sites out that that defines window.chrome themselves)
- Safer check when checking jQuery version.

### Added
- Upgraded to latest Browsertime alpha 14 with longer default timeout times.

## 0.22.0
### Changed
- The cacheHeaders advice checking for missing cache headers got even higher priority, so it will be more influential of the score.

## 0.21.0
### Fixed
- More robust (and right) first paint (as in Browsertime).

### Added
- Shows LastModifiedStats and expireStats to know better if your cache headers are right.
- Display total size in kb/mb (make it easier to read).

## 0.20.3 2016-04-22
### Fixed
- Bug fixed for showing details when you run the CLI using --details

## 0.20.2 2016-04-22
### Fixed
- Do not output the difference in size of images in the avoidScailingImages advice so that it looks better when we display that advice.
- Upgraded to latest PageXray (0.6.0).

## 0.20.1 2016-04-17
### Fixed
- Snufkin has changed name to PageXray.

## 0.20.0 2016-04-15
### Changed
- Cli name for getting more details is now ... details instead of offending.
- Better structures for user timings and measurements, so we can easily move the timings to BT.

## 0.19.0 2016-04-12

### Added
- Get browser and version.
- Show all redirected URLs in the offending section when a main document is redirected.

## 0.18.0 2016-04-07
### Fixed
- Updated id of httpsH2 advice to match filename.
- Added extra advice text if the main document of a page is served private.

### Added
- Added the possibility to take screenshot (it's now supported in Browsertime). Note: Using Chrome the screenshot will be the current view port, using Firefox it will be the full page. This is a webdriver issue, lets see how we can
fix this.

## 0.17.0 2016-03-31
### Added
- Included coach version number in the table output.

## 0.16.1 2016-03-30
### Fixed
- Updated readme to follow the new way of getting JSON output.

## 0.16.0 2016-03-30
### Changed
- Flattened JSON result format by removing top level "coachAdvice".
- Renamed "results" to "advice" in JSON result format.
- Changed format CLI option from -o to -f.

### Added
- New best practice advice: Use HTTPS together with HTTP/2.
- Supports writing output to file via -o <PATH>

## 0.15.1 2016-03-30
### Fixed
- optimalCssSize advice showed the wrong limit of a CSS files
- fastRender missed the number of CSS/JS requests for HTTP/1

## 0.15.0 2016-03-30
### Added
- Shows the number of occurrences when a response isn't a 200 response in responseOk advice.
- Rewrites the fastRender advice and included it in cssInHeadDomain (removed) to make it easier to rewrite the advice later and act on both what's in the DOM and the HTML. We need to add more tests before this can be released.
- Test our test cases against a H2 server (that was easy).
- Drop the cssInHead advice, it is now a anti pattern. https://jakearchibald.com/2016/link-in-body/
- Goodbye combineCss advice and hello optimalCssSize!
- More tests for fastRender and inlineCss advice

## 0.14.0 2016-03-24
### Added
- Optimizely adviced to turn it off when you are not using it.

### Fixed
- We missed getting relative CSS when we checked for CSS loaded inside of head.

## 0.13.0 2016-03-24
### Fixed
- Outputs the size you would save if you set correct cache headers of assets with no cache time
- Better more precise advice for avoidScalingImages, labelOnInput and https.

## 0.12.0 2016-03-23
### Changed
- Lets make it easier to choose mobile, just add --mobile

## 0.11.0 2016-03-23
### Added
- Lets include page size and size/request per content type #19
- Lets us know how many of the assets redirected on the main domain

### Fixed
- combinedCss advice should alert if we have more than 1 CSS.
- neverSupressZoom now reports the failing meta content
- privateAssets now checks for private headers for HTML assets
- faviconAdvice tells us the real problem with the favicon
- section advice tells us how often we have a missing heading


## 0.10.0 2016-03-22
### Added
- Disable missing favicon check for Firefox because of #49
- fastRender advice now checks CSS response size in HTTP/2 to make sure it isn't larger than the magic number.
- Sorts advice alphabetically in table output

## 0.9.0 2016-03-22
### Fixed
- Fixed faulty user agent string for Firefox testing mobile.

### Added
- Skip -u/-f just pass an argument as in sitespeed.io 4.0
- Lets us combine DOM and HAR advice for even smarter advice #13
- Makes sure that the options are passed to HAR advice so that we can have different advice
  depending on device
- pageSize now has different size limit for mobile and desktop  
- Changed combineCSS for only looking at CSS inside of HEAD for HTTP/1
- Dropped combineJs. We can make this better now when we combine DOM & HAR

## 0.8.0 2016-03-21
### Added
- Show transfer vs uncompressed size for JS & CSS if we know it (works in Chrome).

## 0.7.0 2016-03-21
### Added
- Set device type using --device in the CLI. Choose between mobile or desktop.
- Limited support (first HAR page) for outputting HAR as CLI table.

## 0.6.4 2016-03-21
### Fixed
- Better naming of advice headings in CLI table output.
- Updated readme.

## 0.6.3 2016-03-21
### Fixed
- Fixed again for document redirects, old version wasn't working correctly.

## 0.6.2 2016-03-21
### Fixed
- Don't hurt document redirects if it happens from HTTP to HTTPS.
- Updated to latest Browsertime, fixes transfer size problems for Chrome.

## 0.6.1 2016-03-21
### Fixed
- assetRedirect advice stopped working with the last fix. Fixed now.

## 0.6.0 2016-03-21
### Fixed
- assetRedirect advice shouldn't hurt the score if it's the main document, the
  documentRedirect advice takes care of that.
- Cleanup of advice messages.

### Added
- Makes it possible to show the title and description of an advice in the CLI using --description

## 0.5.0 2016-03-21
### Fixed
- Show response codes in the responseOk advice.

### Added
- Use parameter --offending to show offending assets in table CLI output.
- Wrap the text in the output in the table CLI so it looks good.

## 0.4.0 2016-03-19
### Fixed
- combineCSS and combineJS advice should only advice to combine when the page has more that 1
  CSS/JS request.
- headings & sections advice gave wrong score if headings & sections where missing
- If your assets misses a cache header, only give advice about it in cacheHeaders advice and
  not in cacheHeadersLong
- HAR advice didn't correct check HTTP version.
- Better inlineCSS advice when you use HTTP/2

### Added
- Updates docs to include the pickAPage API.
- Outputs CLI data as a table (but you can still choose JSON).
- Warns if a page is using SPDY, Chrome EOL coming soon.

## 0.3.2 2016-03-17
### Fixed
- The pickAPage changed the actual HAR, lets clone the object and return a new HAR.

## 0.3.1 2016-03-17
### Added
- Included coach version in the HAR coach result.
- API method pickAPage(har,pageIndex) to get specific
  HAR with the chosen page.

## 0.3.0 2016-03-16
### Added
- Add brotli as one of content-encoding checks.

### Changed
- Unified naming of util methods to check if HTTP/2 is used.
- Updated to latest released Browsertime 1.0.0.alpha.4
- Unified naming in the API. This is a breaking change so if you are using the
  API you need to change the name accordingly. Checkout lib/index.js

### Fixed
- The merging of HAR & DOM result was broken. Now the HAR and the DOM results
follow the same structure starting with the key coachAdvice.

## 0.2.0 - 2016-03-04
### Added
- Include coach version in the output JSON

### Changed
- Updated to latest released Browsertime 1.0.0.alpha.3
- Latest version of Snufkin 0.3.8
- New structure of the JSON output. Everything is now under results/
