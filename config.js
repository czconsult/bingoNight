const constants = {
  "Channels":{
    LASER1_R: 1,
    LASER1_G: 2,
    LASER1_M: 3,
    PAR_R:4,
    PAR_G:5,
    PAR_B:6,
    PAR_W:7,
    LASER2_R:8,
    LASER2_G:9,
    LASER2_M:10,
    LASER2_S:11
  }
}
const CHANNELS = constants.Channels
console.log(CHANNELS.LASER2_R)
const config = {
  "Lights":{
    "Scenes":{
      "Strobe":{
        "low":[
          ["0x07",255,100],
          []
        ]
      }
    }
  },
  "numBalls":90,
  "qlab":{
    "server":"192.168.0.152",
    "port":53000
  },
  "actions":[
    {
      "title":"Start The Night",
      "backgroundColor":"#0000ff",
      "cue":"/cue/SHOW/start",
      "id":10
    },
    {
      "title":"Pause",
      "backgroundColor":"#0000ff",
      "cue":"/cue/PAUSE/start",
      "id":0
    },
    {
      "title":"Continue",
      "backgroundColor":"#00ff00",
      "cue":"/cue/CONTINUE/start",
      "id":1
    },
    {
      "title":"New Game",
      "backgroundColor":"#ff0000",
      "id":2,
      "cue":"/cue/NEWGAME/start"
    },
    { 
      "title":"Next Ball",
      "backgroundColor":"#ddd",
      "id":3
    },
    { "title":"Check Results",
      "backgroundColor":"#ddd",
      "cue":"/cue/CHECK/start",
      "id":4
    },
    { 
      "title":"False Call",
      "backgroundColor":"#ddd",
      "cue":"/cue/FALSE/start",
      "id":5
    },
    { "title":"Head To Head",
      "backgroundColor":"#ddd",
      "cue":"/cue/H2H/start",
      "id":6
    },
    { "title":"Winner",
      "backgroundColor":"#ddd",
      "cue":"/cue/WINNER/start",
      "id":7
    },
    { 
      "title":"Chaos!",
      "backgroundColor":"#ddd",
      "cue":"/cue/CHAOS/start",
      "id":8
    },
    {
      "title":"Prize intro",
      "backgroundColor":"#ddd",
      "cue":"/cue/PRIZES/start",
      "id":9
    }
  ],
  "balls":{
    "0": {
      "cue": "/cue/B0/start"
    },
    "1": {
      "cue": "/cue/B1/start"
    },
    "2": {
      "cue": "/cue/B2/start"
    },
    "3": {
      "cue": "/cue/B3/start"
    },
    "4": {
      "cue": "/cue/B4/start"
    },
    "5": {
      "cue": "/cue/B5/start"
    },
    "6": {
      "cue": "/cue/B6/start"
    },
    "7": {
      "cue": "/cue/B7/start"
    },
    "8": {
      "cue": "/cue/B8/start"
    },
    "9": {
      "cue": "/cue/B9/start"
    },
    "10": {
      "cue": "/cue/B10/start"
    },
    "11": {
      "cue": "/cue/B11/start"
    },
    "12": {
      "cue": "/cue/B12/start"
    },
    "13": {
      "cue": "/cue/B13/start"
    },
    "14": {
      "cue": "/cue/B14/start"
    },
    "15": {
      "cue": "/cue/B15/start"
    },
    "16": {
      "cue": "/cue/B16/start"
    },
    "17": {
      "cue": "/cue/B17/start"
    },
    "18": {
      "cue": "/cue/B18/start"
    },
    "19": {
      "cue": "/cue/B19/start"
    },
    "20": {
      "cue": "/cue/B20/start"
    },
    "21": {
      "cue": "/cue/B21/start"
    },
    "22": {
      "cue": "/cue/B22/start"
    },
    "23": {
      "cue": "/cue/B23/start"
    },
    "24": {
      "cue": "/cue/B24/start"
    },
    "25": {
      "cue": "/cue/B25/start"
    },
    "26": {
      "cue": "/cue/B26/start"
    },
    "27": {
      "cue": "/cue/B27/start"
    },
    "28": {
      "cue": "/cue/B28/start"
    },
    "29": {
      "cue": "/cue/B29/start"
    },
    "30": {
      "cue": "/cue/B30/start"
    },
    "31": {
      "cue": "/cue/B31/start"
    },
    "32": {
      "cue": "/cue/B32/start"
    },
    "33": {
      "cue": "/cue/B33/start"
    },
    "34": {
      "cue": "/cue/B34/start"
    },
    "35": {
      "cue": "/cue/B35/start"
    },
    "36": {
      "cue": "/cue/B36/start"
    },
    "37": {
      "cue": "/cue/B37/start"
    },
    "38": {
      "cue": "/cue/B38/start"
    },
    "39": {
      "cue": "/cue/B39/start"
    },
    "40": {
      "cue": "/cue/B40/start"
    },
    "41": {
      "cue": "/cue/B41/start"
    },
    "42": {
      "cue": "/cue/B42/start"
    },
    "43": {
      "cue": "/cue/B43/start"
    },
    "44": {
      "cue": "/cue/B44/start"
    },
    "45": {
      "cue": "/cue/B45/start"
    },
    "46": {
      "cue": "/cue/B46/start"
    },
    "47": {
      "cue": "/cue/B47/start"
    },
    "48": {
      "cue": "/cue/B48/start"
    },
    "49": {
      "cue": "/cue/B49/start"
    },
    "50": {
      "cue": "/cue/B50/start"
    },
    "51": {
      "cue": "/cue/B51/start"
    },
    "52": {
      "cue": "/cue/B52/start"
    },
    "53": {
      "cue": "/cue/B53/start"
    },
    "54": {
      "cue": "/cue/B54/start"
    },
    "55": {
      "cue": "/cue/B55/start"
    },
    "56": {
      "cue": "/cue/B56/start"
    },
    "57": {
      "cue": "/cue/B57/start"
    },
    "58": {
      "cue": "/cue/B58/start"
    },
    "59": {
      "cue": "/cue/B59/start"
    },
    "60": {
      "cue": "/cue/B60/start"
    },
    "61": {
      "cue": "/cue/B61/start"
    },
    "62": {
      "cue": "/cue/B62/start"
    },
    "63": {
      "cue": "/cue/B63/start"
    },
    "64": {
      "cue": "/cue/B64/start"
    },
    "65": {
      "cue": "/cue/B65/start"
    },
    "66": {
      "cue": "/cue/B66/start"
    },
    "67": {
      "cue": "/cue/B67/start"
    },
    "68": {
      "cue": "/cue/B68/start"
    },
    "69": {
      "cue": "/cue/B69/start"
    },
    "70": {
      "cue": "/cue/B70/start"
    },
    "71": {
      "cue": "/cue/B71/start"
    },
    "72": {
      "cue": "/cue/B72/start"
    },
    "73": {
      "cue": "/cue/B73/start"
    },
    "74": {
      "cue": "/cue/B74/start"
    },
    "75": {
      "cue": "/cue/B75/start"
    },
    "76": {
      "cue": "/cue/B76/start"
    },
    "77": {
      "cue": "/cue/B77/start"
    },
    "78": {
      "cue": "/cue/B78/start"
    },
    "79": {
      "cue": "/cue/B79/start"
    },
    "80": {
      "cue": "/cue/B80/start"
    },
    "81": {
      "cue": "/cue/B81/start"
    },
    "82": {
      "cue": "/cue/B82/start"
    },
    "83": {
      "cue": "/cue/B83/start"
    },
    "84": {
      "cue": "/cue/B84/start"
    },
    "85": {
      "cue": "/cue/B85/start"
    },
    "86": {
      "cue": "/cue/B86/start"
    },
    "87": {
      "cue": "/cue/B87/start"
    },
    "88": {
      "cue": "/cue/B88/start"
    },
    "89": {
      "cue": "/cue/B89/start"
    },    
    "90": {
      "cue": "/cue/B90/start"
    }    
  }
}

module.exports = config