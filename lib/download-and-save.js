const request = require('request');
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

      request(downloadUrl)
        .pipe(fs.createWriteStream(filename))
        .on('close', () => {
          return resolve();
        });
    });
  });
}
