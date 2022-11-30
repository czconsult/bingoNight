const  { EnttecOpenDMXUSBDevice:DMXDevice } = require("enttec-open-dmx-usb")

const sceneConfig = {
  "Default":{
    type:'follow',
    low:[
      [7,255,100],
      [8,1,100],
      [9,1,100]
    ],
    mid:[
      [1,1,200],
      [2,255,200]
    ],
    high:[
      [4,255,200]
    ]
  },
  "Wild":{
    type:'follow',
    low:[
      [7,255,30],
      [8,1,30],
      [9,1,30]
    ],
    mid:[
      [1,1,30],
      [2,255,30]
    ],
    high:[
      [4,255,30],
      [5,255,30],
      [6,255,30],
      [7,255,30]
    ]
  },
  "Chaos":{
    type:'default',
    control:[
      [4,[255,20],[0,50]],
      [5,[255,30],[0,60]],
      [6,[255,40],[0,30]],
      [7,[255,20],[0,50]],
      [1,[255,180],[0,20]],
      [8,[255,180],[0,20]],
      [11,[255,180],[0,20]],
    ]
  },
  "Ambient":{
    type:'default',
    control:[
      [1,[255]],
      [2,[0]],
      [3,[0]],
      [9,[255]],
      [10,[0]],
      [11,[0]],
      [6,[28]],
      [7,[28]],
    ]
  },
  "Dark":{
    type:'default',
    control:[
      [1,[0]],
      [2,[0]],
      [3,[0]],
      [4,[0]],
      [5,[0]],
      [6,[0]],
      [7,[0]],
      [8,[0]],
      [9,[0]],
      [10,[0]],
      [11,[0]],
    ]
  }
}



class LightControl {
  constructor() {    
    this.enabled = process.env.HAS_LIGHTS === undefined ? true : process.env.HAS_LIGHTS
  }
  clear() {
    this.device.setChannels({
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
  }
  async init() {
    if(!this.enabled) return;
    this.device = new DMXDevice(await DMXDevice.getFirstAvailableDevice(), false)
    this.device.on('ready',() => {
      this.device.startSending(25)
    })
    this.Scene = 'Ambient'
    this.clear()
  }
  setChannel(id, value) {
    if(!this.enabled) return;
    //console.log({[id]: value})
    this.device.setChannels({[id]: value})
  }
  flash(channel, value, duration=flashTime) {
    if(!this.enabled) return;
    console.log('flash')
    this.setChannel(channel,value)
    setTimeout(() => {
      this.setChannel(channel,0x00)
    }, duration)
  }
  runScene() {
    if(!this.enabled) return;
    console.log('running scene')
    this.clear()
    let scene = sceneConfig[this.scene]
    const sceneAtStart = this.scene
    scene.control.forEach((s) => {
      console.log(s)
      const channel = s.shift()
      const doFlash = () => {
        this.flash(channel,s[0][0],s[0][1])
      }
      if(s.length === 1) {
        this.setChannel(channel,s[0][0])
      } else {        
        
        const i = setInterval(() => {
          if(this.scene !== sceneAtStart) {
            clearInterval(i)
          } else {
            doFlash()
          }
        }, s[0][1] + s[1][1])
      }
    })

  }
  set Scene(newScene) {
    if(!this.enabled) return;
    console.log('setting scene', newScene)
    this.scene = newScene
    const scene = sceneConfig[this.scene]
    if(scene.type === 'default') {
      this.runScene()
    }
  }
  get Scene() {
    return this.scene
  }
  low() {    
    if(!this.enabled) return;
    const scene = sceneConfig[this.scene]
    if(scene.type === 'follow') {
      scene.low.forEach((l) => {
        this.flash(l[0],l[1],l[2] || 200)
      })
    }
  }
  mid() {
    if(!this.enabled) return;
    const scene = sceneConfig[this.scene]
    if(scene.type === 'follow') {
      scene.mid.forEach((l) => {
        this.flash(l[0],l[1],l[2] || 200)
      })
    }
  }
  high() {
    if(!this.enabled) return;
    const scene = sceneConfig[this.scene]
    if(scene.type === 'follow') {
        scene.high.forEach((l) => {
          this.flash(l[0],l[1],l[2] || 200)
      })
    }

  }
}

module.exports = LightControl