var bk = SpreadsheetApp.getActiveSpreadsheet();
var sheet = bk.getSheetByName('practice');

function test() {
  var url = "https://yabaiwebyasan.com/test.json";
  var response = UrlFetchApp.fetch(url).getContentText('UTF-8');
  var data = JSON.parse(response);
  Logger.log(data.price);
}

function twitter() {
  var url = "http://api.yabaiwebyasan.com/tweets/yabaiwebyasan";
  var response = UrlFetchApp.fetch(url).getContentText('UTF-8');
  var data = JSON.parse(response);
  var range = sheet.getRange(2, 1, sheet.getLastRow(), 3);
  range.setValues([data]);
}
