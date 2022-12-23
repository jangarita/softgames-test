import {Assets, Container} from 'pixi.js';
import {IScene} from '../core/IScene';
import {BackButton} from '../core/BackButton';
import {GameManager} from '../core/GameManager';
import {MixedText} from './MixedText';

export class MixedTextDemo extends Container implements IScene {
    private readonly NEXT_TEXT_TIME = 2; // In seconds

    private _backButton!: BackButton;
    private _elapsed = 0;

    constructor() {
        super();
        this.load().then();
    }

    private async load() {
        await Assets.loadBundle('MixedTextDemo');

        this.start();
    }

    private start() {
        // Back button
        this._backButton = new BackButton();
        this._backButton.position.set(25, GameManager.height - 25);

        this.addChild(this._backButton);

        this.addChild(new MixedText());
    }

    update(delta: number): void {
        for (const child of this.children) {
            if (child instanceof MixedText) {
                child.update(delta);
            }
        }

        this._elapsed += delta * (1 / 60);

        if (this._elapsed >= this.NEXT_TEXT_TIME) {
            this._elapsed = 0;

            this.addChild(new MixedText());
        }

    }

    resize(): void {
        if (this._backButton) {
            this._backButton.y = GameManager.height - 25;
        }
    }
}
