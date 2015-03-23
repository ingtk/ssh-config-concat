#!/use/bin/evn node

'use strict';

var fs = require('fs');
var _ = require('lodash');

var confPath = process.env.HOME + '/.ssh/conf.d';
var destFile = process.env.HOME + '/.ssh/config';

var exists = fs.existsSync(confPath);
if (!exists) {
  console.log('Please execute following commnad');
  console.log('mkdir $HOME/.ssh/conf.d');
  return;
}

var files = fs.readdirSync(confPath);
var configText = _.chain(files)
  .sortBy()
  .reduce(function(memo, file) {
    var text = fs.readFileSync(confPath + '/' + file, 'utf8');
    memo += text.replace(/#.*vim:.*\n/, '');
    return memo;
  }, '')
  .value();

fs.writeFileSync(destFile, configText);
