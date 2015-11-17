const chai = require('chai');
const expect = chai.expect;
const createFilename = require('../lib/create-filename');

describe('create-filename', () => {
  it('should create filename with extension .jpg', () => {
    const filename = createFilename('dU4fHDw-Ho', 'image/jpeg');
    expect(filename).to.equal('dU4fHDw-Ho.jpg');
  });

  it('should create filename with extension .mp4', () => {
    const filename = createFilename('dU4fHDw-Ho', 'video/mp4');
    expect(filename).to.equal('dU4fHDw-Ho.mp4');
  });

  it('should create filename with extension .ogg', () => {
    const filename = createFilename('dU4fHDw-Ho', 'video/ogg');
    expect(filename).to.equal('dU4fHDw-Ho.ogg');
  });

  it('should create filename with extension .webm', () => {
    const filename = createFilename('dU4fHDw-Ho', 'video/webm');
    expect(filename).to.equal('dU4fHDw-Ho.webm');
  });
});
