import {Container, FederatedPointerEvent, Sprite} from 'pixi.js';
import {Texture} from '@pixi/core';
import {GameManager} from './GameManager';
import {MainMenu} from '../main-menu/MainMenu';

export class BackButton extends Container {
    private _bg: Sprite;

    constructor() {
        super();

        this._bg = new Sprite(Texture.from('back-button'));
        this._bg.scale.set(0.5);
        this._bg.anchor.set(0, 1);
        this.addChild(this._bg);

        this.interactive = true;
        this.cursor = 'pointer';

        this.on('pointerover', this.pointerOverHandler);
        this.on('pointerout', this.pointerOutHandler);
        this.on('pointerdown', this.pointerDownHandler);
        this.on('pointerup', this.pointerUpHandler);
    }

    private pointerOverHandler() {
        this.alpha = 0.6;
    }

    private pointerOutHandler() {
        this.alpha = 1;
    }

    private pointerDownHandler() {
        this.alpha = 0.3;
    }

    private pointerUpHandler(evt: FederatedPointerEvent) {
        evt.stopImmediatePropagation();

        this.pointerOverHandler();

        GameManager.changeScene(new MainMenu());
    }
}
