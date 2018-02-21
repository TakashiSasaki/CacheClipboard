function doGet(e) {
  return HtmlService.createHtmlOutput(UrlFetchApp.fetch("http://jsrun.it/TakashiSasaki/KOph").getContentText());
}

function test(){
  CacheHelper.put("abc", {a:"b", c:123.456});
  Logger.log(CacheHelper.get("abc"));
}
