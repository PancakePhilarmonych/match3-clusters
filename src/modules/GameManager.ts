import Grid from "./Grid";
import * as PIXI from "pixi.js";

export default class GameManager {
  private rows: number; // M
  private columns: number; // N
  private clusterSize: number; // X
  private iconsCount: number; // Y

  private windowWidth: number;
  private windowHeight: number;
  private grid: Grid


  constructor(rows: number, columns: number, clusterSize: number, iconsCount: number) {
    this.rows = rows;
    this.columns = columns;
    this.clusterSize = clusterSize;
    this.iconsCount = iconsCount;

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    this.grid = new Grid(this.columns, this.rows, this.clusterSize, this.iconsCount);

    this.initApp();
  }

  private initApp(): void {
    const app = new PIXI.Application({
      width: this.windowWidth,
      height: this.windowHeight,
      backgroundColor: 0x1e1e1e,
      antialias: true,
    });
    document.body.appendChild(app.view);

    const gridContainer = this.grid.getGridContainer();
    app.stage.addChild(gridContainer);

    app.ticker.add(() => {
      // this.grid.update();
    });
  }
}