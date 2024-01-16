import { Container } from "pixi.js";
import Cell from "./Cell";
export default class Grid {
    private cells: Cell[][];
    private container: Container;
    private minClusterSize: number;
    private typesCount: number;

    constructor(
      columns: number,
      rows: number,
      minClusterSize: number,
      typesCount: number
    ) {

      this.cells = [];
      this.container = new Container();

      this.container.x = window.innerWidth / 2 - (columns * Cell.CELL_WIDTH) / 2;
      this.container.y = window.innerHeight / 2 - (rows * Cell.CELL_HEIGHT) / 2;

      this.minClusterSize = minClusterSize;
      this.typesCount = typesCount;

      for (let x = 0; x < columns; x++) {
          this.cells[x] = [];
          for (let y = 0; y < rows; y++) {
            const newCell = new Cell(x, y);
            this.cells[x][y] = newCell;
            this.container.addChild(newCell.container);
          }
      }
    }

    public getGridContainer(): Container {
      return this.container;
    }
}