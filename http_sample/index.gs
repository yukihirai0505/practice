var BK = SpreadsheetApp.getActiveSpreadsheet();
var TWITTER_SHEET = BK.getSheetByName('twitter');
var INSTAGRAM_SHEET = BK.getSheetByName('instagram');
var INSTAGRAM_CRAWL_SHEET = BK.getSheetByName('instagramCrawl');

function getJson(url) {
  var response = UrlFetchApp.fetch(url).getContentText('UTF-8');
  return JSON.parse(response);
}

// Test 0: api parse test
function test() {
  var data = getJson("https://yabaiwebyasan.com/test.json");
  Logger.log(data);
  Logger.log(data.price);
}

// First you should set header column. If you don't set it, you may get error.

// Test 1: twitter api parse test
function setTwitterData() {
  var data = getJson("http://api.yabaiwebyasan.com/tweets/yabaiwebyasan").map(function (e) {
    return [e.text, new Date(e.created_at), e.media_urls.toString()];
  });
  // clear all data
  TWITTER_SHEET.getRange(2, 1, TWITTER_SHEET.getLastRow(), 3).clear();
  // set tweet values
  TWITTER_SHEET.getRange(2, 1, data.length, 3).setValues(data);
}

// Test 2: instagram api parse test
function setInstaramData() {
  var data = getJson("https://api.yabaiwebyasan.com/v1/instagram/users/i_do_not_like_fashion").media.nodes.map(function (e) {
    return ['=IMAGE("'+ e.thumbnailSrc + '")', e.caption, e.likes.count, e.comments.count];
  });
  // clear all data
  INSTAGRAM_SHEET.getRange(2, 1, INSTAGRAM_SHEET.getLastRow(), 4).clear();
  // set tweet values
  INSTAGRAM_SHEET.getRange(2, 1, data.length, 4).setValues(data);
}

// Test 3: instagram html parse test
function setInstagramCrawlData() {
  var targetHashTag = "idonotlikefashion";
  var url = "https://www.instagram.com/explore/tags/" + targetHashTag;
  var response = UrlFetchApp.fetch(url).getContentText('UTF-8');
  var jsonData = JSON.parse(response.match(/<script type="text\/javascript">window\._sharedData =([\s\S]*?);<\/script>/i)[1]);
  var tagData = jsonData.entry_data.TagPage[0].tag;
  Logger.log(tagData);
  var data = tagData.top_posts.nodes.map(function(e) {
    return ['=IMAGE("'+ e.thumbnail_src + '")', e.caption, e.likes.count, e.comments.count];
  });
  // clear all data
  INSTAGRAM_CRAWL_SHEET.getRange(2, 1, INSTAGRAM_CRAWL_SHEET.getLastRow(), 4).clear();
  // set tweet values
  INSTAGRAM_CRAWL_SHEET.getRange(2, 1, data.length, 4).setValues(data);
}