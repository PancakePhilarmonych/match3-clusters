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

export enum ETileType {
  ONE,
  TWO,
  TREE,
  FOUR,
  FIVE,
}

export interface Position {
  x: number;
  y: number;
}

export const typeTextures = {
  [ETileType.ONE]: iconOne,
  [ETileType.TWO]: iconTwo,
  [ETileType.TREE]: iconThree,
  [ETileType.FOUR]: iconFour,
  [ETileType.FIVE]: iconFive,
}

export const cellTexturesByType = {
  [ETileType.ONE]: cellOne,
  [ETileType.TWO]: cellTwo,
  [ETileType.TREE]: cellThree,
  [ETileType.FOUR]: cellFour,
  [ETileType.FIVE]: cellFive,
}

export const randomTileType = () => {
  const types = [ETileType.ONE, ETileType.TWO, ETileType.TREE, ETileType.FOUR, ETileType.FIVE];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}

export const isSameTileType = (neighborCell: Cell, cell: Cell) => {
  return neighborCell.getTile().getType() === cell.getTile().getType();
}