const chai = require('chai');
const expect = chai.expect;
const createFilename = require('../lib/create-filename');

describe('create-filename', () => {
  it('should create .jpg', () => {
    const filename = createFilename('dU4fHDw-Ho', 'image/jpeg');
    expect(filename).to.equal('dU4fHDw-Ho.jpg');
  });

  it('should create .mp4', () => {
    const filename = createFilename('dU4fHDw-Ho', 'video/mp4');
    expect(filename).to.equal('dU4fHDw-Ho.mp4');
  });

  it('should create .ogg', () => {
    const filename = createFilename('dU4fHDw-Ho', 'video/ogg');
    expect(filename).to.equal('dU4fHDw-Ho.ogg');
  });

  it('should create .webm', () => {
    const filename = createFilename('dU4fHDw-Ho', 'video/webm');
    expect(filename).to.equal('dU4fHDw-Ho.webm');
  });
});
