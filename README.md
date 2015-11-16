instagram-save
==============

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

## Node Usage

```
const instagramSave = require('instagram-save');

instagramSave('dU4fHDw-Ho', 'myDir').then(res => {
  console.log(res.file);
});
```

## Lint Code

```
$ npm run lint
```
