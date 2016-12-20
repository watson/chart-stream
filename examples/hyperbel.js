process.stdout.write('x*2,y/2\n')
plot(1, Math.pow(2, 30))

function plot (x, y) {
  process.stdout.write(x + ',' + y + '\n')
  if (y <= 1) return
  setTimeout(plot, 100, x * 2, Math.round(y / 2))
}
