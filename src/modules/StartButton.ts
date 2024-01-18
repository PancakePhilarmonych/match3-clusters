import * as PIXI from 'pixi.js';
import GameManager from './GameManager';

export default class StartButton {
  private button: PIXI.Graphics;
  private text: PIXI.Text;
  private container: PIXI.Container;

  constructor() {
    this.createButton();
    this.createButtonText();

    this.container = new PIXI.Container();

    this.container.interactive = true;

    this.container.x = window.innerWidth / 2 - GameManager.buttonSize / 2;
    this.container.y = window.innerHeight - GameManager.buttonSize;

    this.container.addChild(this.button);
    this.container.addChild(this.text);
  }

  private createButton(): void {
    this.button = new PIXI.Graphics();
    this.button.beginFill(0x2e2e2e);
    this.button.drawRect(0, 0, GameManager.buttonSize, GameManager.buttonSize / 2);
    this.button.endFill();
    this.button.interactive = true;
    this.button.buttonMode = true;
    this.button.zIndex = 1;
  }

  private createButtonText(): void {
    this.text = new PIXI.Text('Start', {
      fontSize: GameManager.buttonSize / 4,
      fontFamily: 'Arial',
      fill: '#FFFFFF',
    });

    this.text.x = this.button.width / 2 - this.text.width / 2;
    this.text.y = this.button.height / 2 - this.text.height / 2;

    this.text.zIndex = 2;
  }

  public getContainer(): PIXI.Container {
    return this.container;
  }
}
