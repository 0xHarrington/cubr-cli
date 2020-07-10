var blessed = require('blessed')
  , contrib = require('blessed-contrib')
  , screen = blessed.screen()
  , grid = new contrib.grid({rows: 3, cols: 3, screen: screen})


var times = contrib.table({
  keys: true,
  fg: 'white',
  selectedFg: 'white',
  selectedBg: 'blue',
  interactive: true,
  label: 'Session Times',
  border: {type: "line", fg: "cyan"},
  columnWidth: [3, 8, 8, 8]})

times.setData({
  headers: ['Solve #', 'Time', 'Ao5', 'Ao12']
})


// grid.set(row#, col#, rowSpan, colSpan, obj, opts)
var scramble = grid.set(1,1,1,3, contrib.markdown, {label: "Scramble"})
var times = grid.set(2,1,2,1, contrib.table, {fg:"blue", label: "times"})
var timer = grid.set(2,2,2,2, 


screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// fixes https://github.com/yaronn/blessed-contrib/issues/10
screen.on('resize', function() {
  scramble.emit('attach');
  times.emit('attach');
});

screen.render()
