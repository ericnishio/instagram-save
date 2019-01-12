const request = require('request-promise');
const cheerio = require('cheerio');
const createFilename = require('./create-filename');

module.exports = parsePage;

/**
 * @param  {string} url
 * @return {Promise}
 */
function parsePage(url) {
  return new Promise((resolve, reject) => {
    request.get({
      uri: url,
      transform(body) {
        return cheerio.load(body);
      }
    })
      .then($ => {
        const canonicalUrl = $('link[rel="canonical"]').attr('href');

        if (!canonicalUrl) {
          return reject({
            message: `Invalid media ID`,
            url
          });
        }

        const isVideo = $('meta[name="medium"]').attr('content') === 'video';
        const mimeType = isVideo ? $('meta[property="og:video:type"]').attr('content') : 'image/jpeg';
        const partsOfCanonicalurl = canonicalUrl.split('/');
        const indexOfP = partsOfCanonicalurl.indexOf('p');
        const mediaId = partsOfCanonicalurl[indexOfP + 1];
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
      }, err => {
        return reject({
          message: `Failed to request resource`,
          url,
          error: err
        });
      });
  });
}
