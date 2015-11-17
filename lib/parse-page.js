const request = require('request');
const cheerio = require('cheerio');
const createFilename = require('./create-filename');

module.exports = parsePage;

/**
 * @param  {string} url
 * @return {Promise}
 */
function parsePage(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) {
        return reject({
          message: `Failed to request resource`,
          url,
          error: err
        });
      }

      const $ = cheerio.load(body);
      const canonicalUrl = $('link[rel="canonical"]').attr('href');

      if (!canonicalUrl) {
        return reject({
          message: `Invalid media ID`,
          url
        });
      }

      const isVideo = $('meta[name="medium"]').attr('content') === 'video';
      const mimeType = isVideo ? $('meta[property="og:video:type"]').attr('content') : 'image/jpeg';
      const mediaId = canonicalUrl.split('/')[4];
      const filename = createFilename(mediaId, mimeType);
      const downloadUrl = isVideo ? $('meta[property="og:video"]').attr('content') : $('meta[property="og:image"]').attr('content');

      return resolve({
        canonicalUrl,
        isVideo,
        mimeType,
        mediaId,
        filename,
        downloadUrl
      });
    });
  });
}
