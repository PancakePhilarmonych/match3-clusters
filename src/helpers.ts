import iconOne from './assets/sprites/one.png';
import iconTwo from './assets/sprites/two.png';
import iconThree from './assets/sprites/three.png';
import iconFour from './assets/sprites/four.png';
import iconFive from './assets/sprites/five.png';

import cellOne from './assets/sprites/cellOne.png';
import cellTwo from './assets/sprites/cellTwo.png';
import cellThree from './assets/sprites/cellThree.png';
import cellFour from './assets/sprites/cellFour.png';
import cellFive from './assets/sprites/cellFive.png';

import Cell from './modules/Cell';
import * as PIXI from 'pixi.js';

export enum ETileType {
  ONE = 'ONE',
  TWO = 'TWO',
  TREE = 'TREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
}

export interface Position {
  x: number;
  y: number;
}

export const tileTextureByType = {
  [ETileType.ONE]: PIXI.Texture.from(iconOne),
  [ETileType.TWO]: PIXI.Texture.from(iconTwo),
  [ETileType.TREE]: PIXI.Texture.from(iconThree),
  [ETileType.FOUR]: PIXI.Texture.from(iconFour),
  [ETileType.FIVE]: PIXI.Texture.from(iconFive),
}

export const cellTexturesByType = {
  [ETileType.ONE]: PIXI.Texture.from(cellOne),
  [ETileType.TWO]: PIXI.Texture.from(cellTwo),
  [ETileType.TREE]: PIXI.Texture.from(cellThree),
  [ETileType.FOUR]: PIXI.Texture.from(cellFour),
  [ETileType.FIVE]: PIXI.Texture.from(cellFive),
}

export const getRandomTileType = (): ETileType => {
  const values = Object.values(ETileType);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex] as ETileType;
};

export const isSameTileType = (neighborCell: Cell, cell: Cell) => {
  return neighborCell.getTile().getType() === cell.getTile().getType();
}