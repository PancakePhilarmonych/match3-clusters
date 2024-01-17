import { Container } from "pixi.js";
import { isSameTileType } from "../helpers";
import Cell from "./Cell";
export default class Grid {
    private container: Container; 
    private cells: Cell[][] = [];
    private clusters: Cell[][];
    private minClusterSize: number;
    private typesCount: number;
    private columns: number;
    private rows: number;
    
    constructor(
      columns: number,
      rows: number,
      minClusterSize: number,
      typesCount: number
    ) {
      this.minClusterSize = minClusterSize;
      this.typesCount = typesCount;
      this.columns = columns;
      this.rows = rows;
      this.container = new Container();

      this.setContainerPosition();
      this.init();
    }

    public init(): void {
      this.createGrid();
      this.fillClusters();
      this.makeClustersActive();
    }

    public setContainerPosition(): void {
      this.container.x = window.innerWidth / 2 - (this.columns * Cell.CELL_WIDTH) / 2;
      this.container.y = window.innerHeight / 2 - (this.rows * Cell.CELL_HEIGHT) / 2;
    }

    public createGrid() {
      this.cells = [];

      for (let x = 0; x < this.columns; x++) {
        this.cells[x] = [];
        for (let y = 0; y < this.rows; y++) {
          const newCell = new Cell(x, y);
          this.cells[x][y] = newCell;
          this.container.addChild(newCell.container);
        }
      }
    }

    public fillClusters() {
      this.clusters = [];

      this.cells.forEach((column) => {
        column.forEach((cell) => {
          if (cell.isChecked()) {
            return;
          }

          const cellChain = this.getCellChain(cell);

          if (cellChain.length) { 
            this.clusters.push(cellChain);
          }
        });
      });
    }

    public makeClustersActive(): void {
      this.clusters.forEach((cluster) => {
        if (cluster.length < this.minClusterSize) return;
        console.log(cluster);

        const clusterType = cluster[0].getTile().getType();
        cluster.forEach((cell) => cell.setAlternativeSprite(clusterType));
      });
    }

    public getGridContainer(): Container {
      return this.container;
    }

    private getNeighbors(cell: Cell): Cell[] {
      const neighbors: Cell[] = [];
      const { x, y } = cell.getPosition();
      const top = this.getCellTopNeighbor(x, y);
      const right = this.getCellRightNeighbor(x, y);
      const bottom = this.getCellBottomNeighbor(x, y);
      const left = this.getCellLeftNeighbor(x, y);

      if (top) {
        neighbors.push(top);
      }

      if (right) {
        neighbors.push(right);
      }

      if (bottom) {
        neighbors.push(bottom);
      }

      if (left) {
        neighbors.push(left);
      }

      return neighbors;
    }

    private getCellTopNeighbor(x: number, y: number): Cell | null {
      if (y === 0) {
        return null;
      }

      return this.cells[x][y - 1];
    }

    private getCellRightNeighbor(x: number, y: number): Cell | null {
      if (x === this.cells.length - 1) {
        return null;
      }

      return this.cells[x + 1][y];
    }

    private getCellBottomNeighbor(x: number, y: number): Cell | null {
      if (y === this.cells[x].length - 1) {
        return null;
      }

      return this.cells[x][y + 1];
    }

    private getCellLeftNeighbor(x: number, y: number): Cell | null {
      if (x === 0) {
        return null;
      }

      return this.cells[x - 1][y];
    }


    private getCellChain = (cell: Cell, chain: Cell[] = []): Cell[] => {
      const neighbors = this.getNeighbors(cell);  
      const sameTileNeighbors = neighbors.filter((neighbor) => isSameTileType(neighbor, cell));
      
      if (!sameTileNeighbors.length) {
        return chain;
      }

      if (chain.includes(cell)) {
        return chain;
      }

      chain.push(cell);

      sameTileNeighbors.forEach((neighbor) => {
        if (neighbor.isChecked()) return;
        neighbor.setChecked(true);
        this.getCellChain(neighbor, chain);
      });
    
      return chain;
    }
}