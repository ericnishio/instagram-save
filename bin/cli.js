#!/usr/bin/env node

const async = require('async');
const clc = require('cli-color');
const _ = require('lodash');
const save = require('../index');
const dir = process.cwd();
const urls = process.argv.slice(2);

if (urls.length < 1) {
  return console.log(clc.yellow(`Usage: `) + clc.white(`instagram-save [URL or MEDIA_ID]`));
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

async.map(urls, saveAndLog);
