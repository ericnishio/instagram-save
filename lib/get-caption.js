const cheerio = require("cheerio");
var SafeEval = require("safe-eval");

module.exports = getCaption;

/**
 * @param  {string} caption
 * @return {string}
 */
function getCaption($) {
  let caption = "";
  $("script").each(function(i, item) {
    var element_text = $(this).text();
    if (!element_text.match("window._sharedData")) return;

    var context = { window: {} };
    SafeEval(element_text, context);
    caption =
      context.window._sharedData.entry_data.PostPage[0].graphql.shortcode_media
        .edge_media_to_caption.edges[0].node.text;
    return caption;
  });
  return caption;
}
