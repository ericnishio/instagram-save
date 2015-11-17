const _ = require('lodash');

module.exports = createFilename;

/**
 * @param  {string} mediaId
 * @param  {string} mimeType
 * @return {string}
 */
function createFilename(mediaId, mimeType) {
  const mimeTypeToExtensionMap = {
    'image/jpeg': '.jpg',
    'video/mp4': '.mp4',
    'video/ogg': '.ogg',
    'video/webm': '.webm'
  };

  const extension = _.get(mimeTypeToExtensionMap, mimeType);

  return `${mediaId}${extension}`;
}
