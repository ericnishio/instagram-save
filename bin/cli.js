#!/usr/bin/env node

const async = require('async');
const clc = require('cli-color');
const _ = require('lodash');
const save = require('../index');
const parseUrlsFromFile = require('../lib/parse-urls-from-file');
const dir = process.cwd();
const params = process.argv.slice(2);

if (params.length < 1) {
  return console.log(clc.yellow(`Usage: `) + clc.white(`instagram-save [URL or MEDIA_ID]`));
}

if (params[0] === '-f') {
  const sourceFile = params[1];

  if (!sourceFile) {
    return console.log(clc.red(`You must specify a source file.`));
  }

  parseUrlsFromFile(sourceFile).then(urls => {
    async.map(urls, saveAndLog);
  }, err => {
    console.log(clc.red(err.message));
  });
} else {
  async.map(params, saveAndLog);
}

/**
 * @param  {string} url
 * @return {Promise}
 */
function saveAndLog(url) {
  return save(url, dir).then(result => {
    const label = _.capitalize(result.label);
    console.log(clc.green(`${label} saved to ${result.file}`));
  }, err => {
    console.log(clc.red(`Failed to download file from ${err.url}`));
  });
}
