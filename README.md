# chart-stream

Chart time series data from either STDIN or programmatically from any
Node.js app in real time directly in your browser.

![chart](https://cloud.githubusercontent.com/assets/10602/20244560/99a7e1e4-a9ca-11e6-809f-0370491106ad.png)

[![Build status](https://travis-ci.org/watson/chart-stream.svg?branch=master)](https://travis-ci.org/watson/chart-stream)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

Use from the command line:

```
npm install chart-stream -g
```

Use programmatically:

```
npm install chart-stream --save
```

## CLI Usage

Pipe CSV data into STDIN of the `chart-stream` binary. Your default
browser will then automatically be opened and the CSV data will be
plotted live in a chart directly in your browser:

```
node examples/hyperbel.js | chart-stream
```

`chart-stream` expects the input to contain an optional header row
followed by rows of numbers. If the optional header row is given, the
headers will be used as labels in the chart. Each column of numbers will
be plotted as a line in the graph.

## Programmatic Usage

```js
var chart = require('chart-stream')
var csvWriter = require('csv-write-stream')
var memoryUsage = require('memory-usage')

memoryUsage(2000)
  .pipe(csvWriter())
  .pipe(chart(ready))

function ready (url) {
  console.log('Open %s in your browser to see the chart', url)
}
```

## API

The `chart-stream` module exposes a function which when called will
return a writable stream and create an HTTP server which serves the
chart. The function expects a callback as its only argument. The
callback will be called with the URL for the chart.

When CSV data is written to the returned stream, the chart will be
updated, plotting the data from the stream.

The stream expects an optional header row followed by rows of numbers.
If the optional header row is given, the headers will be used as labels
in the chart. Each column of numbers will be plotted as a line in the
graph.

```js
var chart = require('chart-stream')(function (url) {
  console.log('Open %s in your browser to see the chart', url)
})

chart.write('x*2,y/2')
plot(1, Math.pow(2, 30))

function plot (x, y) {
  chart.write(x + ',' + y)
  if (y <= 1) return
  setTimeout(plot, 100, x * 2, Math.round(y / 2))
}
```

## License

MIT
