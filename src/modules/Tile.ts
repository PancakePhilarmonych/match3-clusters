import Cell from './Cell';
import { Sprite, Texture, Container } from 'pixi.js';
import { randomIcon } from '../helpers';
export default class Tile {
  private container: Container;
  private cell: Cell;
  private sprite: Sprite;

  constructor(cell: Cell) {
    this.cell = cell;
    const tileTexture = Texture.from(randomIcon());
    this.sprite = new Sprite(tileTexture);

    this.sprite.width = Cell.CELL_WIDTH;
    this.sprite.height = Cell.CELL_HEIGHT;

    const cellPosition = cell.getPosition();
    this.sprite.x = cellPosition.x * Cell.CELL_WIDTH;
    this.sprite.y = cellPosition.y * Cell.CELL_HEIGHT;
    

    this.container = new Container();
    this.container.addChild(this.sprite);
  }

  public getContainer(): Container {
    return this.container;
  }
}