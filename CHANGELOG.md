# CHANGELOG - webcoach

## Unreleased
### Added
- You can now get CLI output without colors, thank you https://github.com/bronzehedwick

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
- Safer check when checking JQuery version.

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
- Changed format cli option from -o to -f.

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
- Limited support (first HAR page) for outputting HAR as cli table.

## 0.6.4 2016-03-21
### Fixed
- Better naming of advice headings in cli table output.
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
- Use parameter --offending to show offending assets in table cli output.
- Wrap the text in the output in the table cli so it looks good.

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
- Updated to latest relesed Browsertime 1.0.0.alpha.4
- Unified naming in the API. This is a breaking change so if you are using the
  API you need to change the name accordingly. Checkout lib/index.js

### Fixed
- The merging of HAR & DOM result was broken. Now the HAR and the DOM results
follow the same structure starting with the key coachAdvice.

## 0.2.0 - 2016-03-04
### Added
- Include coach version in the ouput JSON

### Changed
- Updated to latest relesed Browsertime 1.0.0.alpha.3
- Latest version of Snufkin 0.3.8
- New structure of the JSON output. Everything is now under results/
