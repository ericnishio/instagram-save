const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const async = require('async');
const _ = require('lodash');

module.exports = save;

/**
 * @param  {string} identifier media ID or URL
 * @return {Promise}
 */
function save(identifier, dir) {
  return new Promise((resolve, reject) => {
    const url = identifier.substring(0, 8) === 'https://' ? identifier : `https://www.instagram.com/p/${identifier}/`;

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
      const filename = createFilename(mediaId, mimeType, dir);
      const downloadUrl = isVideo ? $('meta[property="og:video"]').attr('content') : $('meta[property="og:image"]').attr('content');

      request.head(downloadUrl, error => {
        if (error) {
          return reject({
            message: `Download failed`,
            url,
            error
          });
        }

        request(downloadUrl)
          .pipe(fs.createWriteStream(filename))
          .on('close', () => {
            return resolve({
              file: filename,
              type: isVideo ? 'video' : 'photo',
              mimeType,
              url,
              source: downloadUrl
            });
          });
      });
    });
  });
}

/**
 * @param  {string} mediaId
 * @param  {string} mimeType
 * @param  {string} dir
 * @return {string}
 */
function createFilename(mediaId, mimeType, dir) {
  const mimeTypeToExtensionMap = {
    'video/mp4': '.mp4',
    'video/ogg': '.ogg',
    'video/webm': '.webm',
    'image/jpeg': '.jpg'
  };

  const extension = _.get(mimeTypeToExtensionMap, mimeType, '.jpg');

  return `${dir}/${mediaId}${extension}`;
}
