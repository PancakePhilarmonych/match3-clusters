import { Container } from "pixi.js";
import { isSameTileType } from "../helpers";
import Cell from "./Cell";
import GameManager from "./GameManager";
export default class Grid {
    private container: Container; 
    private cells: Cell[][] = [];
    private clusters: Cell[][];
    
    constructor() {
      this.container = new Container();

      this.setContainerPosition();
      this.init();
    }

    public init(): void {
      this.createGrid();
      this.clusters = this.findClusters();
      this.makeClustersActive();
    }

    public setContainerPosition(): void {
      this.container.x = window.innerWidth / 2 - (GameManager.columns * GameManager.cellSize) / 2;
      this.container.y = window.innerHeight / 2 - (GameManager.rows * GameManager.cellSize) / 2;
    }

    public createGrid() {
      this.cells = [];

      for (let x = 0; x < GameManager.columns; x++) {
        this.cells[x] = [];
        for (let y = 0; y < GameManager.rows; y++) {
          const newCell = new Cell(x, y);
          this.cells[x][y] = newCell;
          this.container.addChild(newCell.container);
        }
      }
    }

    public findClusters() {
      return this.cells.reduce((acc: Cell[][], column) => {
        column.forEach((cell) => {
          if (cell.isChecked()) {
            return;
          }
    
          const cellChain = this.getCellChain(cell);
    
          if (cellChain.length) {
            acc.push(cellChain);
          }
        });
    
        return acc;
      }, []);
    }

    public makeClustersActive(): void {
      const valideClusters = this.clusters.filter((cluster) => cluster.length >= GameManager.clusterMinSize);
      if(!valideClusters.length) {
        this.init();
        return;
      }

      valideClusters.forEach((cluster) => {
        const clusterType = cluster[0].getTile().getType();
        cluster.forEach((cell) => cell.setAlternativeSprite(clusterType));
      });
    }

    public getContainer(): Container {
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