import Cell from './Cell';
import { Sprite, Texture, Container } from 'pixi.js';
import { randomTileType, typeTextures, ETileType } from '../helpers';
export default class Tile {
  private container: Container;
  private cell: Cell;
  private sprite: Sprite;
  private type: ETileType;

  constructor(cell: Cell) {
    this.type = randomTileType();
    this.cell = cell;
    const tileTexture = Texture.from(typeTextures[this.type]);
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

  public getType(): ETileType {
    return this.type;
  }
}