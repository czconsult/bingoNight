const fs = require('fs')
var portAudio = require('naudiodon');

console.log(process.argv[2])

const test = async () => {
  console.log(portAudio.getDevices());

  var ai = new portAudio.AudioIO({
    inOptions: {
      channelCount: 2,
      sampleFormat: portAudio.SampleFormat24Bit,
      sampleRate: 44100,
      deviceId: 2, // Use -1 or omit the deviceId to select the default device
      closeOnError: false // Close the stream if an audio error is detected, if set false then just log the error
    }
  });


  var ao = new portAudio.AudioIO({
    outOptions: {
      channelCount: 2,
      sampleFormat: portAudio.SampleFormat24Bit,
      sampleRate: 44100,
      deviceId: 1, // Use -1 or omit the deviceId to select the default device
      closeOnError: false // Close the stream if an audio error is detected, if set false then just log the error
    }
  });

  
  var ws = fs.createWriteStream(`${process.argv[2] || 'unnamed'}.raw`);
  
  ai.on('data', buf => console.log(buf));
  ai
  .pipe(ws)
  //ws.start()
  ai.start()



}

test()
