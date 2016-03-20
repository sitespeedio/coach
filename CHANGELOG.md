# CHANGELOG - webcoach

## UNRELEASED
### Fixed
- Show response codes in the responseOk advice.

### Added
- Use parameter --offending to show offending assets in table cli output.

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
- Update docs to include the pickAPage API.
- Output CLI data as a table (but you can still choose JSON).
- Warn if a page is using SPDY, Chrome EOL coming soon.

## 0.3.2 2016-03-17
### Fixed
- The pickAPage changed the actual HAR, lets clone the object and return a new HAR.

## 0.3.1 2016-03-17
### Added
- Include coach version in the HAR coach result.
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
- The merging of HAR & DOM result was broken. Now the HAR and the DOM result
follow the same structure starting with the key coachAdvice.

## 0.2.0 - 2016-03-04
### Added
- Include coach version in the ouput JSON

### Changed
- Updated to latest relesed Browsertime 1.0.0.alpha.3
- Latest version of Snufkin 0.3.8
- New structure of the JSON output. Everything is now under results/
