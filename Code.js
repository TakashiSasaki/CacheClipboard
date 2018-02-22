function doGet(e) {
  var htmlTemplate = HtmlService.createTemplateFromFile("index");
  var htmlOutput = htmlTemplate.evaluate();
  htmlOutput.setTitle("Cache Clipboard");
  return htmlOutput;
}

function test(){
  CacheHelper.put("abc", {a:"b", c:123.456});
  Logger.log(CacheHelper.get("abc"));
}


function deleteClipboard(clipboardName){
  PropertiesService.getUserProperties().deleteProperty(clipboardName);
  return getClipboards();
}

function computeClipboardId(clipboardName){
  var email = Session.getEffectiveUser().getEmail();
  var salt = PropertiesService.getScriptProperties().getProperty("salt");
  var md5Bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, salt + email + clipboardName);
  var md5String = Utilities.base64Encode(md5Bytes);
  return md5String;
}

function getClipboards(){
  var clipboards = [];
  var userProperties = PropertiesService.getUserProperties().getProperties();
  for(var i in userProperties) {
    var clipboard = {};
    clipboard.name = i;
    clipboard.content = null;
    clipboard.description = userProperties[i];
    clipboard.id = computeClipboardId(i);
    clipboards.push(clipboard);
  }
  return clipboards;
}

function addClipboard(clipboardName, description){
  PropertiesService.getUserProperties().setProperty(clipboardName, description);
  return getClipboards();
}