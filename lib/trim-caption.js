module.exports = trimCaption;

/**
 * @param  {string} caption
 * @return {string}
 */
function trimCaption(caption) {
  let res = caption.split(`“`)[1];
  res = res.split(`”`)[0];
  return res;
}
