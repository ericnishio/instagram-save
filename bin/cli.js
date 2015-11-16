#!/usr/bin/env node

const async = require('async');
const clc = require('cli-color');
const _ = require('lodash');
const instagramSave = require('../index');
const dir = process.cwd();
const identifiers = process.argv.slice(2);

if (identifiers.length < 1) {
  return console.log(clc.yellow(`Usage: `) + clc.white(`instagram-save [URL or media ID]`));
}

/**
 * @param {string} identifiers
 * @return {Promise}
 */
const save = identifier => {
  return instagramSave(identifier, dir).then(res => {
    const type = _.capitalize(res.type);
    console.log(clc.green(`${type} saved to ${res.file}`));
  }, err => {
    console.log(clc.red(`Failed to download file from ${err.url}`));
  });
};

async.map(identifiers, save);
