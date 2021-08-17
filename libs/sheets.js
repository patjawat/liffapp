
import { google } from 'googleapis';
export async function getEmojiList() {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'emoji', // sheet name
    });
    console.log(response)

    const rows = response.data.values;
    if (rows.length) {
      return rows.map((row) => ({
        title: row[2],
        subtitle: row[3],
        code: row[4],
        // browser: row[5],
        // short_name: row[17],
        // emojipedia_slug: row[18],
        // descriptions: row[19],
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}
