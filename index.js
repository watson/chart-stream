'use strict'

var path = require('path')
var http = require('http')
var PassThrough = require('readable-stream').PassThrough
var pump = require('pump')
var ecstatic = require('ecstatic')
var SSE = require('sse-stream')

module.exports = function (cb) {
  var input = new PassThrough()
  var server = http.createServer(ecstatic({ root: path.join(__dirname, 'public') }))
  var sse = SSE('/data')

  sse.install(server)

  sse.on('connection', function (client) {
    pump(input, client, function (err) {
      if (err) throw err
    })
  })

  server.listen(function () {
    sse.interval.unref()
    cb('http://localhost:' + server.address().port)
  })

  server.unref()

  return input
}
