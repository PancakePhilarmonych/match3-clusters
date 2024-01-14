import './main.css'
import * as PIXI from 'pixi.js';


const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1e1e1e,
});

const gameContainer = new PIXI.Container(); // Game container contains "start" button and grid 

gameContainer.width = app.screen.width;
document.body.appendChild(app.view);