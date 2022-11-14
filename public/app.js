
'use strict';

const {useEffect, createElement} = React


class NumberGrid extends React.Component {
  constructor(props) {
    super(props);
    this.current = props.current;
  }

  render() {
    if(!this.props.ballsUsed) return;
    const rows = Array(10).fill(0)
    const getRows = (x) => {      
      return rows.map((r,ix) => {
        const cell = (x*10+ix) + 1 
        const content = this.props.ballsUsed.includes(cell) ? cell : ' '
        return <div key={ix} className="cell">{content}</div>})
    }
    const cols = Array(9).fill(0).map((i, ix)=>{
        return <div key={ix} className="col">{getRows(ix)}</div>
      })
      return <div className="numbergrid">
        {cols}
        </div>
  }
}



class Current extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return <div className="current"><span>{this.props.current || ' '}</span></div>
  }
}


class Control extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
  }
  
  render() {
    console.log(this.props)    
    const style = {
      backgroundColor:this.props.config.backgroundColor || "#dddddd"
    }
    const execute = () => {
      console.log(this.props.config)
      this.props.execute(this.props.config)
    }
    return <div className="control" onClick={execute} style={style}><span>{this.props.config.title}</span></div>
  }
}


class ShowControl extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { liked: false };

  }
  componentDidMount() {
    const status = fetch('/config').then(res=>res.json()).then(config => {
      console.log(config)
      this.setState(config)
    })
  }

  render() {
    if(!this.state || !this.state.actions) return
    const style = {
      backgroundColor:"#ffccaa"
    }
    return <div className="innerContainer">
      {this.state.actions.map((c,id) => {
        return <Control execute={this.props.execute} key={id} config={this.state.actions[id]} />
      })}
    </div>
  }
}


class Status extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('x', this.props)
      return <div className="status">
        <NumberGrid ballsUsed={this.props.ballsUsed}/>
        <Current current={this.props.currentBall}/>
      </div>
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
    this.socket = io()

  }
  componentDidMount() {
    const getStatus = async () => {
      const status = await fetch('/status').then(res=>res.json()).then(status => {
        console.log(status)
        this.setState(status)
      })
    }
    getStatus().then(() => {
      this.socket.on('connect', ()=>console.log(this.socket.id))
      this.socket.on('connect_error', ()=>{
        setTimeout(()=>this.socket.connect(),5000)
      })
      this.socket.on('next', (ball) => {        
        console.log('NEXT NUMBER', ball)
        getStatus()
      })
      this.socket.on('new-game', () => {        
        console.log('New Game')
        getStatus()
      })
      this.socket.on('time', (data)=>setTime(data))
      this.socket.on('disconnect',()=>setTime('server disconnected'))
    })
  }

  render() {
    if(!this.state || !this.state) {
      return <div>Loading</div>
    }
    const execute = (config) => {
      this.socket.emit('action', config.id)

    }
    return <div className="innerContainer">
      <div className="left"><ShowControl execute={execute}/></div>
      <div className="right"><Status currentBall={this.state.currentBall} ballsUsed={this.state.ballsUsed}/></div>
    </div>
  }
}


const domContainer = document.querySelector('#container');
console.log(domContainer)
const root = ReactDOM.createRoot(domContainer);
root.render(createElement(App));