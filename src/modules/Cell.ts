import Tile from './Tile';
import cellSprite from '../assets/sprites/cell.png';
import { Sprite, Container, Texture } from 'pixi.js';
import { ETileType, Position, cellTexturesByType } from '../helpers';
import GameManager from './GameManager';
export default class Cell {
  private checked: boolean = false;
  private tile: Tile;
  private sprite: Sprite;
  private position: Position = {x: 0, y: 0};

  public container: Container;

  constructor(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;

    const cellTexture = Texture.from(cellSprite);
    this.sprite = new Sprite(cellTexture);

    this.sprite.width = GameManager.cellSize;
    this.sprite.height = GameManager.cellSize;
    this.sprite.x = this.position.x * GameManager.cellSize;
    this.sprite.y = this.position.y * GameManager.cellSize;
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

  public setAlternativeSprite(type: ETileType): void {
    const alternativeCellTexture = cellTexturesByType[type];
    this.sprite.texture = alternativeCellTexture;
  }

  public setDefaultSprite(): void {
    const cellTexture = Texture.from(cellSprite);
    this.sprite.texture = cellTexture;
  }

  public isChecked(): boolean {
    return this.checked;
  }

  public setChecked(checked: boolean): void {
    this.checked = checked;
  }
}