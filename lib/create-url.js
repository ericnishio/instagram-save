module.exports = createUrl;

/**
 * @param  {string} urlOrMediaId
 * @return {string}
 */
function createUrl(urlOrMediaId) {
  return isUrl(urlOrMediaId) ? urlOrMediaId : `https://www.instagram.com/p/${urlOrMediaId}/`;
}

/**
 * @param  {string} urlOrMediaId
 * @return {boolean}
 */
function isUrl(urlOrMediaId) {
  return urlOrMediaId.substring(0, 8) === 'https://' || urlOrMediaId.substring(0, 7) === 'http://';
}
