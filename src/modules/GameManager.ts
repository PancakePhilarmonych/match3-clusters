import Grid from './Grid';
import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import StartButton from './StartButton';

export default class GameManager {
  public static rows: number; // M
  public static columns: number; // N
  public static clusterMinSize: number; // X
  public static colorsCount: number; // Y

  public static cellSize: number;
  public static buttonSize: number;

  private grid: Grid;
  private startButton: StartButton;

  public static setConfig(
    rows: number,
    columns: number,
    clusterSize: number,
    iconsCount: number,
  ): void {
    const isLandscape = window.innerWidth > window.innerHeight;

    GameManager.rows = rows;
    GameManager.columns = columns;
    GameManager.clusterMinSize = clusterSize;
    GameManager.colorsCount = iconsCount;
    GameManager.cellSize = window.innerWidth / columns / (isLandscape ? 3 : 1.5);
    GameManager.buttonSize = window.innerHeight / 8;
  }

  constructor() {
    if (
      !GameManager.rows ||
      !GameManager.columns ||
      !GameManager.clusterMinSize ||
      !GameManager.colorsCount
    ) {
      throw new Error('Game config is not set');
    }

    this.initApp();
  }

  private restart(): void {
    this.grid.init();
  }

  private initApp(): void {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1e1e1e,
      antialias: true,
    });

    this.grid = new Grid();
    this.startButton = new StartButton();

    const buttonContainer = this.startButton.getContainer();

    buttonContainer.on('pointerdown', () => {
      gsap.to(buttonContainer, { alpha: 0.5, duration: 0.2 });
      gsap.to(buttonContainer, { alpha: 1, duration: 0.2, delay: 0.2 });
      this.restart();
    });

    app.stage.addChild(this.grid.getContainer());
    app.stage.addChild(this.startButton.getContainer());

    document.body.appendChild(app.view);
  }
}
