import Cell from './Cell';
import { Sprite, Container } from 'pixi.js';
import { getRandomTileType, tileTextureByType, ETileType } from '../helpers';
import GameManager from './GameManager';

export default class Tile {
  private container: Container;
  private sprite: Sprite;
  private type: ETileType;

  constructor(cell: Cell) {
    this.type = getRandomTileType();
    this.sprite = new Sprite(tileTextureByType[this.type]);

    this.sprite.width = GameManager.cellSize;
    this.sprite.height = GameManager.cellSize;

    const cellPosition = cell.getPosition();
    this.sprite.x = cellPosition.x * GameManager.cellSize;
    this.sprite.y = cellPosition.y * GameManager.cellSize;

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
