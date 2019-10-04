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

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;

tileW = 30;
tileH = 30;

tileRowCount = 0;
tileColumnCount = 0;

moves = 0;
countGreenSprites = 0;

enemy = new Image();
hero = new Image();

_tile = [];
