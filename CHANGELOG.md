# CHANGELOG - webcoach

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
