const { extractSheets } = require('spreadsheet-to-json');
const { google } = require('googleapis');
const creds = require('../../credentials/googleAuth.json');
const sheets = google.sheets('v4');

export const getSheet = payload => {
  const request = {
    spreadsheetId: payload.spreadsheetId,
    ranges: [],
    includeGridData: false,
    auth: creds
  };

  sheets.spreadsheets.get(request, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(JSON.stringify(response, null, 2));
  });

  const spreadsheetId = payload.spreadsheetid;
  console.log(payload);
  extractSheets(
    {
      spreadsheetKey: spreadsheetId
      // credentials: require('../../credentials/googleAuth.json')
    },
    (err, data) => {
      return data;
    }
  );
};
