import {Assets, Container, Sprite} from 'pixi.js';
import {IScene} from '../core/IScene';
import {BackButton} from '../core/BackButton';
import {GameManager} from '../core/GameManager';
import * as particles from '@pixi/particle-emitter';
import {Texture} from '@pixi/core';

export class FireDemo extends Container implements IScene {
    private _backButton!: BackButton;
    private readonly _particleContainer: Container;
    private _emitter!: particles.Emitter;
    private _pixiLogo!: Sprite;

    constructor() {
        super();

        this._particleContainer = new Container();

        this.load().then();
    }

    private async load() {
        await Assets.loadBundle('FireDemo');

        this.start();
    }

    private start() {
        // logo
        this._pixiLogo = new Sprite(Texture.from('pixi-js'));
        this._pixiLogo.anchor.set(0.5, 1);
        this.addChild(this._pixiLogo);

        // Particles
        this._emitter = new particles.Emitter(this._particleContainer, Assets.get('fire-emitter') as particles.EmitterConfigV3);

        this.addChild(this._particleContainer);
        this._emitter.autoUpdate = true;

        // Back button
        this._backButton = new BackButton();
        this._backButton.position.set(25, GameManager.height - 25);

        this.addChild(this._backButton);

        this.resize();
    }

    update(): void {
        // ---
    }

    resize(): void {
        this._particleContainer.position.set((GameManager.width / 2) - 250, GameManager.height);

        if (this._pixiLogo) {
            this._pixiLogo.position.set((GameManager.width / 2), GameManager.height - 50);
        }

        if (this._backButton) {
            this._backButton.y = GameManager.height - 25;
        }
    }
}
