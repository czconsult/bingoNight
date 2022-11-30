const applescript = require('applescript')



class AppleMusic {
  constructor() {
    this.enabled = process.env.HAS_MUSIC === undefined ? true : process.env.HAS_MUSIC
  }
  stop() {
    if(!this.enabled) return
    var script = `tell application "Music" to stop`
    applescript.execString(script, function(err, rtn) {
      if(err) {
        console.log('something went wrong applescript', err)
      } else {
      }
    })
  }
  playTrack(track) {
    if(!this.enabled) return
    var script = `tell application "Music" to play track "${track}" once true`
    applescript.execString(script, function(err, rtn) {
      if(err) {
        console.log('something went wrong applescript', err)
      } else {
      }
    })
  }
}
module.exports = AppleMusic