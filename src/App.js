import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" tabIndex={0} onKeyDown={this.handleKeyPress}>
        <div>
        <canvas ref={this.canvasRef} width={this.WIDTH} height={this.HEIGHT} />
      </div>
      </div>
    );
  }
