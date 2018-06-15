# <img src="doc/instagram-save.png" height="60" alt="instagram-save" />

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

Downloads and saves Instagram photos and videos to your current working
directory.

## Setup

Requirements: *Node 4+*

```
$ npm install -g instagram-save
```

## CLI Usage

Run `instagram-save` by passing one or more URLs or media IDs as arguments,
like so:

```
$ instagram-save dU4fHDw-Ho
$ instagram-save https://www.instagram.com/p/dU4fHDw-Ho/
$ instagram-save dU4fHDw-Ho 6IbLiMQ-LE
```

Or read URLs from a file (e.g. `urls.txt`):

```
https://www.instagram.com/p/dU4fHDw-Ho/
https://www.instagram.com/p/6IbLiMQ-LE/
```

And run:

```
$ instagram-save -f urls.txt
```

## Node Usage

```javascript
const save = require('instagram-save');

save('dU4fHDw-Ho', 'myDir').then(res => {
  console.log(res.file);
});
```

## Run Tests

```
$ npm test
```

## Lint Code

```
$ npm run lint
```

## License

MIT © [Eric Nishio](http://ericnish.io)

[npm-url]: https://npmjs.org/package/instagram-save
[npm-image]: https://img.shields.io/npm/v/instagram-save.svg?style=flat-square

[travis-url]: https://travis-ci.org/ericnishio/instagram-save
[travis-image]: https://img.shields.io/travis/ericnishio/instagram-save.svg?style=flat-square
