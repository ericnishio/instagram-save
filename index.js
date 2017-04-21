const createUrl = require('./lib/create-url');
const downloadAndSave = require('./lib/download-and-save');
const parsePage = require('./lib/parse-page');

module.exports = save;

/**
 * @param  {string} urlOrMediaId
 * @return {Promise}
 */
function save(urlOrMediaId, dir) {
  return new Promise((resolve, reject) => {
    const url = createUrl(urlOrMediaId);

    parsePage(url)
      .then(post => {
        const downloadUrl = post.downloadUrl;
        const filename = post.filename;
        const isVideo = post.isVideo;
        const mimeType = post.mimeType;
        const file = `${dir}/${filename}`;

        downloadAndSave(downloadUrl, file).then(() => {
          return resolve({
            file,
            mimeType,
            url,
            label: isVideo ? 'video' : 'photo',
            source: downloadUrl
          });
        });
      })
      .catch(err => {
        return reject({
          url,
          error: err,
          message: `Download failed`
        });
      });
  });
}
