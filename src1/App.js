import './App.css';
import { init } from './main';
import { Component } from 'react';

const SIZE = 512;
class App extends Component {
  componentDidMount() {
    let canvas = document.getElementById('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    let gl = canvas.getContext('webgl');
    init(gl);
  }

  render() {
    return (
      <div id="wrap">
        <canvas id="canvas" width={SIZE} height={SIZE}></canvas>
      </div>
    );
  }
}

export default App;
