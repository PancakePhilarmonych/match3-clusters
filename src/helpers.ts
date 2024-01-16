import iconOne from './assets/sprites/one.png';
import icoonTwo from './assets/sprites/two.png';
import icoonTree from './assets/sprites/three.png';
import icoonFour from './assets/sprites/four.png';
import icoonFive from './assets/sprites/five.png';


export const randomIcon = () => {
  const icons = [iconOne, icoonTwo, icoonTree, icoonFour, icoonFive];
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
}