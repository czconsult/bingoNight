process.env = Object.assign({}, process.env, {
  HAS_LIGHTS:false,
  HAS_OSC:false,
  HAS_MUSIC:false,
})


const { application } = require('express')
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const port = 3000
const path = require('path')
const { start } = require('repl')
const Bingo = require('./bingo')
var readline = require('readline');
const io = require('socket.io')(server);


//app.get('/', (req, res) => {
//  res.static('./html/index.html')
//})

//app.use(express.static('public'))

const config = require('./config')
const MusicBeat = require('./music-beat')
const LightControl = require('./light-control')
const AppleMusic = require('./apple-music')
const OSC = require('./osc')
console.log("config", config)

const init = async () => {

  const bingo = Bingo.factory(config.numBalls)
  const musicBeat = new MusicBeat(2)
  const lightControl = new LightControl()
  const appleMusic = new AppleMusic()
  const osc = new OSC()
  
  lightControl.init()
  musicBeat.start()
  
  musicBeat.on('low', () => {
    lightControl.low()
  })
  musicBeat.on('mid', () => {
    lightControl.mid()
  })
  musicBeat.on('high', () => {
    lightControl.high()
  })
  osc.on('playTrack', (track) => {
    appleMusic.playTrack(track)
  })
  osc.on('stopTrack', () => {
    appleMusic.stop()
  })
  osc.on('scene', (sceneId) => {
    lightControl.Scene = sceneId
  })

  const sendBallCue = (ball) => {    
    const cfg = config.balls[ball]
    console.log(config.qlab)
    console.log(cfg)
    osc.send({server:config.qlab.server, port:config.qlab.port, packets:[
      //{address: "/cue/99/liveText", args: [{type:'t', value:ball || 1}]},
      {address: cfg.cue, args: []}
    ]})
/*
    udpPort.send({
      timeTag:osc.timeTag(0),
      packets:[
        //{address: "/cue/99/liveText", args: [{type:'t', value:ball || 1}]},
        {address: cfg.cue, args: []}
        
      ]
    }, config.qlab.server, config.qlab.port);
    //udpPort.send({address: "/cue/TEST/text", args: [{type:'s', value:ball || 1}]}, '127.0.0.1', 53000);
*/    
  }

  io.on('connection',(socket)=>{
    console.log('client connected: ',socket.id)
    bingo.on('next', (ball) => {
      if(ball) {
        socket.emit('next', ball)
        sendBallCue(ball)
      }
    })
    bingo.on('new-game', () => {
      socket.emit('new-game')
    })
    socket.on('action', (id) => {
      console.log('Action ',  id)
      if(id === 3) {
        bingo.next()
      }
      if(id === 2) {
        bingo.newGame()
      }
      const cfg = config.actions.find(a => a.id === id)
      if(cfg) {
        if(cfg.cue) {
          osc.send({server:config.qlab.server, port:config.qlab.port, packets:[
            //{address: "/cue/99/liveText", args: [{type:'t', value:ball || 1}]},
            {address: cfg.cue, args: []}
          ]})
        }
      } else {
        console.log('ERROR - ACTION WITH NO CONFIG - Ignoring')
      }
    })
    socket.join('game-room')
    
    socket.on('disconnect',(reason)=>{
      console.log(reason)
    })
  })

  app.get('/status', (req, res) => {
    res.send(bingo.status)
  })

  app.get('/config', (req, res) => {
    res.send(config)
  })
  app.use(express.static(path.join(__dirname, 'public')))
  
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  
  readline.emitKeypressEvents(process.stdin);  
  if (process.stdin.isTTY)
      process.stdin.setRawMode(true);
  
  process.stdin.on('keypress', (chunk, key) => {
    console.log(key.name)
    if (key && key.name == 'space')
      bingo.next()
    if(key && key.name == 'q')
      process.exit()
  });

  
  bingo.newGame()

}

init()