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
  var header

  sse.install(server)

  sse.on('connection', function (client) {
    input.once('data', function (chunk) {
      if (chunk !== header) client.write(header)
      client.write(chunk)
      pump(input, client)
    })
  })

  server.listen(function () {
    sse.interval.unref()
    cb('http://localhost:' + server.address().port)
  })

  server.unref()

  input.once('data', function (chunk) {
    header = chunk
  })

  return input
}
