import React from 'react'
import ReactDOM from 'react-dom'

const sayHello = require('../../util/sayHello')

let msg = sayHello('React World')

const Content = (props) => (
  <div style={{border: '1px solid hotpink'}}>
    <i>Content</i>
    <p>{props.msg}</p>
  </div>
)

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      msg
    }
  }
  render(){
    return (
      <div style={{border: '1px solid green'}}>
        <i>App</i>
        <Content msg={this.state.msg}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('react-hello-world')
)