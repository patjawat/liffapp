// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');


export default  async (req, res) => {

  const { request, name } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1g8oRzHoC0RKSmOUzYukvQ9qmNGaIZo8WaV16HQhmL7Q";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    // range: "ชีต1!A:A",
    range: "ชีต1",
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "ชีต1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [['user2', 'test2']],
    },
  });
  res.send(getRows.data)
}
