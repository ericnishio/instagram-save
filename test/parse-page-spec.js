'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const sinon = require('sinon');
require('sinon-as-promised');

const request = require('request-promise');
const parsePage = require('../lib/parse-page');
const cheerio = require('cheerio');

const fakeVideoPage = cheerio.load(`
<html>
  <head>
    <meta name="medium" content="video" />
    <meta property="og:video:type" content="video/mp4" />
    <link rel="canonical" href="https://www.instagram.com/p/dU4fHDw-Ho/">
    <meta property="og:video" content="http://scontent-ams3-1.cdninstagram.com/hphotos-xpt1/t50.2886-16/12143491_793651304077577_693715132_n.mp4" />
  </head>
</html>
`);

describe('parse-page', () => {
  after(() => {
    request.get.restore();
  });

  it('should extract data from Instagram page', () => {
    sinon.stub(request, 'get').resolves(fakeVideoPage);

    return expect(parsePage('https://www.instagram.com/p/dU4fHDw-Ho/')).to.eventually.deep.equal({
      canonicalUrl: 'https://www.instagram.com/p/dU4fHDw-Ho/',
      isVideo: true,
      mimeType: 'video/mp4',
      mediaId: 'dU4fHDw-Ho',
      filename: 'dU4fHDw-Ho.mp4',
      downloadUrl: 'http://scontent-ams3-1.cdninstagram.com/hphotos-xpt1/t50.2886-16/12143491_793651304077577_693715132_n.mp4'
    });
  });
});
