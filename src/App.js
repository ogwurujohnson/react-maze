import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" tabIndex={0} onKeyDown={this.handleKeyPress}>
        <div className="box">
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

  constructor(props){
    super(props);
    this.canvasRef = React.createRef();
    this.handleKeyPress = this.handleKeyPress.bind(this);

    let input = prompt("Enter desired board height");
    this.tileRowCount = parseInt(input);
    input = prompt("Enter desired board width");
    this.tileColumnCount = parseInt(input);
  }

  componentDidMount() {
    this._canvas = this.canvasRef.current;
    this._ctx = this._canvas.getContext("2d");
    this.setTiles();
    this.draw();
  }

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

  handleKeyPress(e){
    e.preventDefault();
    // down arrow key
    if(e.nativeEvent.keyCode === 40){
      for(let c=0; c<this.tileColumnCount; c++){
        for(let r=0; r<this.tileRowCount; r++){
            if(this._tile[c][r].state === "s"){
              if(r<this.tileRowCount){
                this.newEmptyPosition(c,r);
                r++;
              if(r !== this.tileRowCount){
                this.moves++;
                if(this._tile[c][r].state === "w"){
                  this.removeGreenSprite();
                }
                this.newStartPosition(c,r);
              }else{
                r--;
                this.newStartPosition(c,r);
              }
              break;
            }
          }
          }
        }
      }
      // up arrow key
      else if(e.nativeEvent.keyCode === 38){
        for(let c=0; c<this.tileColumnCount; c++){
          for(let r=0; r<this.tileRowCount; r++){
              if(this._tile[c][r].state === "s"){
                if(r>0){
                  this.newEmptyPosition(c,r)
                  r--;
                  if(r !== 0){
                    this.moves++;
                    if(this._tile[c][r].state === "w"){
                      this.removeGreenSprite();
                    }
                    this.newStartPosition(c,r);
                  }else{
                    this.newStartPosition(c,r)
                  }
                  break;
                }
              }
            }
          }
        }
        // right arrow key
        else if(e.nativeEvent.keyCode === 39){
          for(let c=0; c<this.tileColumnCount; c++){
            for(let r=0; r<this.tileRowCount; r++){

                if(this._tile[c][r].state === "s"){

                  if(c<this.tileColumnCount){
                    this.newEmptyPosition(c,r);
                    c++;

                    if(c !== this.tileColumnCount){
                      this.moves++;
                      if(this._tile[c][r].state === "w"){
                        this.removeGreenSprite();
                      }
                      this.newStartPosition(c,r);
                    }else{
                      c--;
                      this.newStartPosition(c,r);
                    }
                    break;
                  }
                }
              }
            }
          }
          // left arrow key
          else if(e.nativeEvent.keyCode === 37){
            for(let c=0; c<this.tileColumnCount; c++){
              for(let r=0; r<this.tileRowCount; r++){
                  if(this._tile[c][r].state === "s"){
                    if(c>0){
                      this.newEmptyPosition(c,r);
                      c--;
                      if(c !== 0){
                        this.moves++;
                        if(this._tile[c][r].state === "w"){
                          this.removeGreenSprite();
                        }
                      this.newStartPosition(c,r);
                      }else{
                        this.newStartPosition(c,r);
                      }
                      break;
                    }
                  }
                }
              }
            }
    }

    newStartPosition(c, r){
      this._tile[c][r].state = "s";
      let x = this._tile[c][r].x;
      let y = this._tile[c][r].y;
      this.rect(x,y,this.tileW,this.tileH,"s");
    }

    newEmptyPosition(c,r){
      this._tile[c][r].state = "e";
      let x = this._tile[c][r].x;
      let y = this._tile[c][r].y;
      this.rect(x,y,this.tileW,this.tileH,"e");
    }

    removeGreenSprite(){
      this.countGreenSprites--;
    }

    rect(x,y,w,h,state){
      if(state === "s"){
        this.hero = new Image();
        this.hero.src = "images/johnson.jpg";
        this.hero.onload=()=>{
          this._ctx.drawImage(this.hero,x,y,w,h);
        }
      }else if(state === 'e'){
        this._ctx.fillStyle = "#FFFFFF";
        this._ctx.beginPath();
        this._ctx.rect(x,y,w,h);
        this._ctx.closePath();
        this._ctx.fill();
        this._ctx.stroke();
      }else if(state === 'w'){
        this.enemy = new Image();
        this.enemy.src = "images/hb.png";
        this.enemy.onload=()=>{
          this._ctx.drawImage(this.enemy,x,y,w,h);
        };
      }
    }

    clear(){
      this._ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
    }

}

export default App;
