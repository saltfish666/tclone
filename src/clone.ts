#!/usr/bin/env node
import * as fs from 'fs'
import * as path from 'path'
const argv = require('yargs').argv

if (argv['v']) {
  console.log(require('../package.json').version)
  process.exit(0)
}

if (argv['_'].length === 0 || argv['h'] || argv['help']) {
  let data = fs.readFileSync(path.join(__dirname, '../bin/usage.txt'), 'utf8')
  console.log(data)
  process.exit(0)
}

const github = require('octonode')

let token = argv['t'] || argv['token']
if (!token) {
  console.log('unauthorization user limte to github api 60/pre_hour')
}
const client = github.client(token)

let dirDepth = argv['d'] || 10
let fileDepth = argv['f'] || 1

let url = require('./getDownloadUrl.js')(argv['_'][0])
let Location = path.normalize(argv['_'][1] || './nclone')

if (/.*[a-zA-Z0-9]+\/[a-zA-Z0-9]+\/blob\/.*/.test(url)) {
  require('./downloadFile')(Location, url)
} else {
  require('./downloadDir')(client, Location, url, dirDepth, fileDepth)
}
