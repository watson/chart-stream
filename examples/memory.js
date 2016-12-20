'use strict'

var opn = require('opn')
var chart = require('chart-stream')
var csvWriter = require('csv-write-stream')
var memoryUsage = require('memory-usage')

memoryUsage(2000)
  .pipe(csvWriter())
  .pipe(chart(opn))
