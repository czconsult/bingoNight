const fs = require('fs')
const EventEmitter = require('events');

var portAudio = require('naudiodon');
const {MusicBeatDetector, MusicBeatScheduler} = require('music-beat-detector') 
const  { EnttecOpenDMXUSBDevice:DMXDevice } = require("enttec-open-dmx-usb");
const { emit } = require('process');


class MusicBeat extends EventEmitter {
  constructor(deviceId) {
    super()
    this.deviceId = deviceId
  }
  start() {
    this.ai = new portAudio.AudioIO({
      inOptions: {
        channelCount: 2,
        sampleFormat: portAudio.SampleFormat16Bit,
        sampleRate: 44100,
        deviceId: this.deviceId, // Use -1 or omit the deviceId to select the default device
        closeOnError: false // Close the stream if an audio error is detected, if set false then just log the error
      }
    });
  
    const musicBeatScheduler = new MusicBeatScheduler(pos => {
      //console.log(`peak at ${pos}ms`) // your music effect goes here
    })
  
    const musicBeatDetector = new MusicBeatDetector({
      scheduler: musicBeatScheduler.getScheduler(),
      debugFilter:-1,
      sensitivity: 0.6,// 0.6
      minThreashold: 1638 //1638
    })
  
    var ws = fs.createWriteStream('/dev/null');
    const analyser = musicBeatDetector.getAnalyzer()
  
    this.ai
    .pipe(analyser)
      .on('peaks-detected', (peaks) => {
        const flashTime = 200
        const setChannel = (id, value) => {
          //console.log({[id]: value})
          device.setChannels({[id]: value})
        }
        const flash = (channel, value, duration=flashTime) => {
          setChannel(channel,value)
          setTimeout(() => {
            setChannel(channel,0x00)
          }, duration)
        }
        peaks.forEach((peak)=> {
          switch(peak.x) {
            case 0:
              this.emit('low')
              break;
            case 1:
              this.emit('mid')
              break;
            case 2:
              this.emit('high')
              break;
          }
        })
      })
      .on('end', () => {
        console.log('end')
      })
      .on('open', () => musicBeatScheduler.start())
    .pipe(ws)
    //ao.start()
    this.ai.start()
  }
  stop() {
    ai.quit()
  }
}

module.exports = MusicBeat