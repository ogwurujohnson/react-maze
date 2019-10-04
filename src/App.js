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

  setTiles(){
    //generate empty tiles
    for(let c=0; c<this.tileColumnCount; c++){
      this._tile[c] = [];
      for(let r=0; r<this.tileRowCount; r++){
          this._tile[c][r] = {
            x:c*(this.tileW+3),
            y:r*(this.tileH+3),
            state:"e"
          }
      }
    }

    //set start tile position
    let startcolumn = Math.round(this.tileColumnCount/2);
    let startrow = Math.round(this.tileRowCount/2);
    this._tile[startcolumn][startrow].state = "s";

    //generate green sprites tile position
    this.countGreenSprites = this.tileColumnCount > this.tileRowCount ? this.tileColumnCount : this.tileColumnCount < this.tileRowCount ? this.tileRowCount : this.tileColumnCount === this.tileRowCount ? this.tileColumnCount : 0;
    let greenSprite = 0;
    while(greenSprite < this.countGreenSprites){
      let column = (Math.floor(Math.random()*this.tileColumnCount)+1)-1;
      let row = (Math.floor(Math.random()*this.tileRowCount)+1)-1;
      if(column!==startcolumn && row!==startrow){
        if(this._tile[column][row].state !== "w"){
          this._tile[column][row].state = "w";
          greenSprite++;
        }
      }
    }
  }

  draw(){
    this.clear();
    for(let c=0; c<this.tileColumnCount; c++){
      for(let r=0; r<this.tileRowCount; r++){
        this.rect(this._tile[c][r].x, this._tile[c][r].y, this.tileW, this.tileH, this._tile[c][r].state);
      }
    }
  }
