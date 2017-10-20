var BK = SpreadsheetApp.getActiveSpreadsheet();
var TWITTER_SHEET = BK.getSheetByName('twitter');
var INSTAGRAM_SHEET = BK.getSheetByName('instagram');
var INSTAGRAM_CRAWL_SHEET = BK.getSheetByName('instagramCrawl');

function getJson(url) {
  var response = UrlFetchApp.fetch(url).getContentText('UTF-8');
  return JSON.parse(response);
}

function test() {
  var data = getJson("https://yabaiwebyasan.com/test.json");
  Logger.log(data);
  Logger.log(data.price);
}

// Test 1
function setTwitterData() {
  var data = getJson("http://api.yabaiwebyasan.com/tweets/yabaiwebyasan").map(function (e) {
    return [e.text, new Date(e.created_at), e.media_urls.toString()];
  });
  // clear all data
  TWITTER_SHEET.getRange(2, 1, TWITTER_SHEET.getLastRow(), 3).clear();
  // set tweet values
  TWITTER_SHEET.getRange(2, 1, data.length, 3).setValues(data);
}

// Test 2
function setInstaramData() {
  var data = getJson("https://api.yabaiwebyasan.com/v1/instagram/users/i_do_not_like_fashion").media.nodes.map(function (e) {
    return ['=IMAGE("'+ e.thumbnailSrc + '")', e.caption, e.likes.count, e.comments.count];
  });
  // clear all data
  INSTAGRAM_SHEET.getRange(2, 1, INSTAGRAM_SHEET.getLastRow(), 4).clear();
  // set tweet values
  INSTAGRAM_SHEET.getRange(2, 1, data.length, 4).setValues(data);
}

// Test 3
function setInstagramCrawlData() {

}