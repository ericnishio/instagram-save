const request = require('request-promise');
const fs = require('fs');

module.exports = downloadAndSave;

/**
 * @param  {string} downloadUrl
 * @param  {string} filename
 * @return {Promise}
 */
function downloadAndSave(downloadUrl, filename) {
  return new Promise((resolve, reject) => {
    request.head(downloadUrl, error => {
      if (error) {
        return reject(error);
      }

      request
        .get(downloadUrl)
        .pipe(fs.createWriteStream(filename))
        .on('close', () => {
          return resolve();
        });
    });
  });
}
