import iconOne from './assets/sprites/one.png';
import icoonTwo from './assets/sprites/two.png';
import icoonTree from './assets/sprites/three.png';
import icoonFour from './assets/sprites/four.png';
import icoonFive from './assets/sprites/five.png';

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
  [ETileType.TWO]: icoonTwo,
  [ETileType.TREE]: icoonTree,
  [ETileType.FOUR]: icoonFour,
  [ETileType.FIVE]: icoonFive,
}

export const randomTileType = () => {
  const types = [ETileType.ONE, ETileType.TWO, ETileType.TREE, ETileType.FOUR, ETileType.FIVE];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}