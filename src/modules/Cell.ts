import Tile from './Tile';
import cellSprite from '../assets/sprites/cell.png';
import { Sprite, Container, Texture } from 'pixi.js';

interface Position {
  x: number;
  y: number;
}
export default class Cell {
  public static readonly CELL_WIDTH = 50;
  public static readonly CELL_HEIGHT = 50;

  private position: Position = {x: 0, y: 0};
  private tile: Tile;
  private sprite: Sprite;
  public container: Container;

  constructor(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;

    const cellTexture = Texture.from(cellSprite);
    this.sprite = new Sprite(cellTexture);

    this.sprite.width = Cell.CELL_WIDTH;
    this.sprite.height = Cell.CELL_HEIGHT;
    this.sprite.x = this.position.x * Cell.CELL_WIDTH;
    this.sprite.y = this.position.y * Cell.CELL_HEIGHT;
    this.tile = new Tile(this);
    const tileContainer = this.tile.getContainer();

    this.container = new Container();
    this.container.addChild(this.sprite);
    this.container.addChild(tileContainer);
  }

  public getTile(): Tile {
    return this.tile;
  }

  public setTile(tile: Tile): void {
    this.tile = tile;
  }

  public getPosition(): Position {
    return this.position;
  }

  public spritePosition(): Position {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    }
  }
}