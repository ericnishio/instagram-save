const chai = require('chai');
const expect = chai.expect;
const createUrl = require('../lib/create-url');

describe('create-url', () => {
  it('should create a URL from a media ID', () => {
    const url = createUrl('dU4fHDw-Ho');
    expect(url).to.equal('https://www.instagram.com/p/dU4fHDw-Ho/');
  });

  it('should create a URL from a URL', () => {
    const url = createUrl('https://www.instagram.com/p/dU4fHDw-Ho/');
    expect(url).to.equal('https://www.instagram.com/p/dU4fHDw-Ho/');
  });
});
