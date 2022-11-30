const osc = require('osc')
const EventEmitter = require('events');

class OSC extends EventEmitter {
  constructor(port = 52000) {
    super()
    this.enabled = process.env.HAS_OSC == undefined ? true : process.env.HAS_OSC
    if(this.enabled) {
        this.udpPort = new osc.UDPPort({
        localAddress: "0.0.0.0",
        localPort: port,
        metadata: false
      });
      this.udpPort.open();
      this.udpPort.on('message', (msg) => {
        console.log('message', msg)
        const addr = msg.address.split('/')
        console.log(addr)
        switch(addr[1]) {
          case 'playTrack':
            this.emit('playTrack', msg.args[0])
            return 
            //return play(msg.args[0])
          break;
          case 'stopTrack':
            this.emit('stopTrack')
            return 
            //return stop()
          break;
          case 'scene':
            this.emit('scene', msg.args[0])
            return 
            //lightControl.Scene = msg.args[0]
        }
      })
    }
  }
  send({server, port, packets}) {
    if(!this.enabled) return;
    this.udpPort.send({
      timeTag:osc.timeTag(0),
      packets,
    }, server, port);

  }
}

module.exports = OSC

/*
  udpPort.on("message", function (oscMsg) {
    console.log("An OSC Message was received!", oscMsg);
  });

  udpPort.on("ready", function () {
    console.log('sending Cue')
  });
*/