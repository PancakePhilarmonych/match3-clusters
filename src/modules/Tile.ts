import Cell from './Cell';
import { Sprite, Texture, Container } from 'pixi.js';
import icon from '../assets/sprites/icon-one.png';
export default class Tile {
  private container: Container;
  private cell: Cell;
  private sprite: Sprite;

  constructor(cell: Cell) {
    this.cell = cell;
    const tileTexture = Texture.from(icon);
    this.sprite = new Sprite(tileTexture);

    this.sprite.width = Cell.CELL_WIDTH;
    this.sprite.height = Cell.CELL_HEIGHT;

    const cellPosition = cell.getPosition();
    this.sprite.x = cellPosition.x * 50;
    this.sprite.y = cellPosition.y * 50;

    this.container = new Container();
    this.container.addChild(this.sprite);
  }

  public getContainer(): Container {
    return this.container;
  }
}