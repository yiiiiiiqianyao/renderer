import './App.css';
import { init } from './main'
import { Component } from 'react';

class App extends Component{
  componentDidMount() {
    let canvas = document.getElementById('canvas')
    canvas.width = 600
    canvas.height = 600
    let gl = canvas.getContext('webgl')
    init(gl)
  }

  render() {
    return  <div id="wrap">
    <canvas id="canvas" width="600" height="600"></canvas>
  </div>
  }
}

export default App;
