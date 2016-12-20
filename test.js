'use strict'

var test = require('tape')
var chart = require('./')

test('call callback', function (t) {
  chart(function (url) {
    t.ok(/^http:\/\/localhost:\d+/.test(url))
    t.end()
  })
})
