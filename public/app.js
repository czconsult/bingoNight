
'use strict';


const e = React.createElement;


class NumberGrid extends React.Component {
  constructor(props) {
    super(props);
    this.current = props.current;
    this.called = [10,15,25]
  }

  render() {
    const rows = Array(10).fill(0)
    const getRows = (x) => {
      console.log('s')
      return rows.map((r,ix) => {
      return <div key={ix} className="cell">X</div>})
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
    this.current = props.current;
  }

  render() {
      return <div className="current"><span>{this.current}</span></div>
  }
}


class Control extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
  }

  render() {
      return <div className="control"><span>{this.title}</span></div>
  }
}


class ShowControl extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { liked: false };
    this.controlConfig = [
      {title:'Pause'},
      {title:'Continue'},
      {title:'New Game'},
      {title:'Next Ball'},
      {title:'Check Results'},
      {title:'False Call'},
      {title:'Head To Head'},
      {title:'Winner'},
      {title:'Chaos!'},
      {title:'Prize intro'}
    ]
  }

  render() {
      return <div className="innerContainer">
        {this.controlConfig.map((c,id) => {
          return <Control key={id} title={c.title} />
        })}
      </div>
  }
}




class App extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { liked: false };
  }

  render() {
      return <div className="innerContainer">
        <div className="left"><ShowControl/></div>
        <div className="right"><NumberGrid/></div>
      </div>
  }
}


const domContainer = document.querySelector('#container');
console.log(domContainer)
const root = ReactDOM.createRoot(domContainer);
root.render(e(App));