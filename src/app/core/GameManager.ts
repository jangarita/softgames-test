import {IScene} from './IScene';
import {Application, UPDATE_PRIORITY} from 'pixi.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {addStats, Stats} from 'pixi-stats';

export class GameManager {
    private static _app: Application;
    private static _currentScene: IScene;
    private static _stats: Stats;

    constructor() {
        throw new Error('Static class, use GameManager.start() instead.');
    }

    public static start() {
        GameManager._app = new Application({
            backgroundColor: '#F9F9D6',
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        this._stats = addStats(document, GameManager._app);

        window.addEventListener('resize', this.resize.bind(this));
        GameManager._app.ticker.add(GameManager.update);
        GameManager._app.ticker.add(this._stats.update, this._stats, UPDATE_PRIORITY.UTILITY);

        document.body.appendChild(GameManager._app.view as HTMLCanvasElement);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.PIXI = PIXI;
    }

    public static changeScene(scene: IScene) {
        if (GameManager._currentScene) {
            GameManager._app.stage.removeChild(GameManager._currentScene);
            GameManager._currentScene.destroy();
        }

        GameManager._currentScene = scene;
        GameManager._currentScene.resize();
        GameManager._app.stage.addChild(GameManager._currentScene);
    }

    public static resize() {
        GameManager._app.renderer.resize(GameManager.width, GameManager.height);

        if (!GameManager._currentScene) return;

        GameManager._currentScene.resize();
    }

    private static update(delta: number) {
        if (!GameManager._currentScene) return;

        GameManager._currentScene.update(delta);
    }

    public static get width(): number {
        return Math.min(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    public static get height(): number {
        return Math.min(document.documentElement.clientHeight, window.innerHeight || 0);
    }
}
