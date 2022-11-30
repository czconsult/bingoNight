var MPlayer = require('mplayer');
 
var player = new MPlayer();



const openFile = () => {
  player.openFile('/users/chris/personal/Showtime.mp4');
}




player.on('ready', () => {
  console.log('we can begin')
  openFile()
})
player.on('start', () => {
  console.log('Started')
  setTimeout(() => {
    player.stop()
  }, 10000)
    
})



setTimeout(() => {
  process.exit(0)
}, 20000)

