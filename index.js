const cheerio = require('cheerio');
const request = require('request');
const clc = require('cli-color');
const fs = require('fs');
const _ = require('lodash');
const dir = process.cwd();
const id = _.last(process.argv); // TODO: Add support for multiple IDs.

if (process.argv.length < 3) {
  return console.log(clc.yellow(`Usage: `) + clc.white(`instagram-save MEDIA_ID`));
}

save(id);

/**
 * @param  {string} identifier media ID or URL
 * @return {Promise}
 */
function save(identifier) {
  return new Promise((resolve, reject) => {
    const url = identifier.substring(0, 8) === 'https://'
      ? identifier
      : `https://www.instagram.com/p/${identifier}/`;

    request(url, (err, response, body) => {
      if (err) {
        console.log(clc.red(`Failed to request resource: ${url}`));

        return reject();
      }

      const $ = cheerio.load(body);
      const isVideo = $('meta[name="medium"]').attr('content') === 'video';
      const mimeType = $('meta[property="og:video:type"]').attr('content') || 'image/jpeg';
      const canonicalUrl = $('link[rel="canonical"]').attr('href');

      if (!canonicalUrl) {
        console.log(clc.red(`Invalid media ID.`));

        return reject();
      }

      const mediaId = canonicalUrl.split('/')[4];
      const filename = createFilename(mediaId, mimeType);
      const downloadUrl = isVideo
        ? $('meta[property="og:video"]').attr('content')
        : $('meta[property="og:image"]').attr('content');

      request.head(downloadUrl, (err, res, body) => {
        request(downloadUrl)
          .pipe(fs.createWriteStream(filename))
          .on('close', () => {
            const mediaType = isVideo ? 'Video' : 'Photo';

            console.log(clc.green(`${mediaType} saved to `) + clc.white(`${filename}`));

            return resolve(filename);
          });
      });
    });
  });
}

/**
 * @param  {string} mediaId
 * @param  {string} mimeType
 * @return {string}
 */
function createFilename(mediaId, mimeType) {
  const mimeTypeToExtensionMap = {
    'video/mp4': '.mp4',
    'video/ogg': '.ogg',
    'video/webm': '.webm',
    'image/jpeg': '.jpg'
  };

  const extension = _.get(mimeTypeToExtensionMap, mimeType, '.jpg');

  return `${dir}/${mediaId}${extension}`;
}
