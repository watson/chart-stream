#!/usr/bin/env node
'use strict'

var pump = require('pump')
var opn = require('opn')
var chart = require('./')

pump(process.stdin, chart(ready), function (err) {
  if (err) throw err
  process.exit()
})

function ready (url) {
  opn(url)
}
