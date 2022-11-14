const fs = require('fs')
const EventEmitter = require('events');
const folder = '../games'

class BingoGame extends EventEmitter {
  constructor({numBalls,gameId}) {
    super()
    if(numBalls) {
      this.numBalls = numBalls
      this.gameId = Date.now()
      this.current = 0
      this.used = []
      return
    }
    if(gameId) {
      const fn = `${folder}/${gameId}.json`
      try {
        const h = JSON.parse(fs.readFileSync(fn).toString())
        Object.entries(h).map(p => {
          this[p[0]] = p[1]
        })
      } catch(err) {
        console.log(err)
      }
  
    }

  }
  get GameId() {
    return this.gameId
  }
  get status() {
    const status = {
      ballsTaken:this.current+1,
      currentBall:this.sequence[this.current] || ' ',
      ballsUsed:this.used,
      gameId:this.gameId
    }
    return JSON.stringify(status, null, 2)
  }
  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  newGame() {
    this.sequence = []
    for(var x=1;x<=this.numBalls;x++) {
      this.sequence.push(x)
    }
    this.shuffle(this.sequence)
    this.current=-1
    this.used.length = 0
    this.emit('new-game')
    console.log(this)

  }
  static factory(numBalls) {
    const game = new BingoGame({numBalls})
    return game
  }  
  next() {
    this.current++
    this.used.push(this.sequence[this.current])
    this.emit('next', this.sequence[this.current])
    return this.sequence[this.current]
  }
  save() {
    const fn = `${folder}/${this.gameId}.json`
    fs.writeFileSync(fn, JSON.stringify(this))
  }
  static load(gameId) {
    const game = new BingoGame({gameId})
    return game;
  }
}

module.exports = BingoGame


const g = BingoGame.factory(90)
g.newGame()

for(var x = 0;x<90;x++) {
  //console.log(g.next())
}
g.save()
const g1 = BingoGame.load(g.GameId)

