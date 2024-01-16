import Tile from './Tile';
import cellSprite from '../assets/sprites/cell.png';
import alternativeCellSprite from '../assets/sprites/alternativeCell.png';
import { Sprite, Container, Texture } from 'pixi.js';
import { Position } from '../helpers';

export default class Cell {
  public static readonly CELL_WIDTH = 72;
  public static readonly CELL_HEIGHT = 72;

  private position: Position = {x: 0, y: 0};
  private tile: Tile;
  private sprite: Sprite;
  public container: Container;
  private checked: boolean = false;

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

  public setAlternativeSprite(): void {
    const alternativeCellTexture = Texture.from(alternativeCellSprite);
    this.sprite.texture = alternativeCellTexture;
  }

  public setDefaultSprite(): void {
    const cellTexture = Texture.from(cellSprite);
    this.sprite.texture = cellTexture;
  }

  public isChecked(): boolean {
    return this.checked;
  }
}