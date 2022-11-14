const fs = require('fs')
var portAudio = require('naudiodon');
const {MusicBeatDetector, MusicBeatScheduler} = require('music-beat-detector') 
const  { EnttecOpenDMXUSBDevice:DMXDevice } = require("enttec-open-dmx-usb")

const test = async () => {
  const device = new DMXDevice(await DMXDevice.getFirstAvailableDevice(), false)
  device.setChannels({
    1: 0x00, // L1 - R - 0 or 1
    2: 0x00, // L1 - G - 0 or 1
    3: 0xFF, // L1 - Mo 0 of FF
    4: 0x00, // Pac R 0 - 255
    5: 0x00, // Pac G 0 - 255
    6: 0x00, // Pec B 0 - 255
    7: 0x00, // Pac W 0 - 255
    8: 0x00, // L2 - R - 0 or 1
    9: 0x00, // L2 - G - 0 or 1
    10: 0x00, // L2 - Mo 0 or FF
    11: 0x00, // L2 - Strobe 0 -> 255 for speed 0 = none 255 = epilepsy!
  })
  device.on('ready',() => {
    device.startSending(25)
  })

  //console.log(device)



  console.log(portAudio.getDevices());

  var ai = new portAudio.AudioIO({
    inOptions: {
      channelCount: 2,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 44100,
      deviceId: 2, // Use -1 or omit the deviceId to select the default device
      closeOnError: false // Close the stream if an audio error is detected, if set false then just log the error
    }
  });

/*
  var ao = new portAudio.AudioIO({
    outOptions: {
      channelCount: 2,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 44100,
      deviceId: 1, // Use -1 or omit the deviceId to select the default device
      closeOnError: false // Close the stream if an audio error is detected, if set false then just log the error
    }
  });
*/

  var ws = fs.createWriteStream('rawAudio.raw');

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

  /*
  ai.on("data",chunk=>{
    ao.write(chunk)
    analyser.write(chunk)
  });

  analyser.on('peak-detected', (pos, bpm) => console.log(`peak-detected at ${pos}ms, detected bpm ${bpm}`))
  analyser.on('end', () => {
      //fs.writeFileSync('graph.svg', musicGraph.getSVG())
      console.log('end')
    })
  analyser.on('open', () => {
    musicBeatScheduler.start()
  })

  ao.start();
  ai.start()
  */


  ai
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
        console.log(peak)
        switch(peak.x) {
          case 0:
            flash(0x07, 255, 100)
            flash(0x08, 1, 100)
            flash(0x09, 1, 100)
            break;
          case 1:
            flash(0x01, 1)
            flash(0x02, 0xff)
            break;
          case 2:
            flash(0x04, 255)
            break;
        }
      })
    })
    .on('end', () => {
      fs.writeFileSync('graph.svg', musicGraph.getSVG())
      console.log('end')
    })
    .on('open', () => musicBeatScheduler.start())
  .pipe(ws)
  //ao.start()
  ai.start()



  process.on("SIGINT", ()=>{
    ai.quit()
    //ao.quit()
    process.exit(0)
  });


}

test()
