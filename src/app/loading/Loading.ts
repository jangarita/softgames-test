import {IScene} from '../core/IScene';
import {Assets, Container, Graphics} from 'pixi.js';
import {GameManager} from '../core/GameManager';
import {MainMenu} from '../main-menu/MainMenu';

export class Loading extends Container implements IScene {
    private readonly _grp: Graphics;

    constructor() {
        super();

        this._grp = new Graphics();
        this._grp.lineStyle(6, 0xFF0000, 1);
        this._grp.arc(0, 0, 30, 2 * Math.PI, Math.PI / 2);

        this.addChild(this._grp);

        this.startLoading().then();
    }

    private async startLoading() {
        await Assets.init({manifest: 'assets/load-manifest.json'});
        await Assets.backgroundLoadBundle(['MainMenu', 'CardDeckDemo', 'MixedTextDemo', 'FireDemo']);
        await Assets.loadBundle(['MainMenu']);

        GameManager.changeScene(new MainMenu());
    }

    update(delta: number) {
        this._grp.angle -= 4 * delta;
    }

    resize() {
        this._grp.x = GameManager.width - this._grp.width - 25;
        this._grp.y = GameManager.height - this._grp.height - 25;
    }
}
