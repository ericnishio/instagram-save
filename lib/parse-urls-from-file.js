const fs = require('fs');
const cwd = process.cwd();

module.exports = parseUrlsFromFile;

/**
 * @param  {string} file
 * @return {Promise}
 */
function parseUrlsFromFile(file) {
  const filePath = `${cwd}/${file}`;

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject({
        message: `Invalid source file`,
        file: filePath
      });
    }

    const urls = fs.readFileSync(filePath, 'utf8').trim().split('\n');

    return resolve(urls);
  });
}
