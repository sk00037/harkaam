// Apps Script code for HarKaam form -> saves POSTed JSON into Sheet1
var sheetName = 'Sheet1';

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);

    // Parse incoming POST body (assumes JSON)
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = {};
    }

    var name = data.name || '';
    var phone = data.phone || '';
    var city = data.city || '';
    var need = data.need || '';
    var quantity = data.quantity || '';
    var whenNeeded = data.whenNeeded || '';
    var details = data.details || '';

    // Append a new row: Timestamp, Name, Phone, City, Need, Quantity, When, Details
    sheet.appendRow([new Date(), name, phone, city, need, quantity, whenNeeded, details]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
