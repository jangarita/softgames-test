import {IScene} from '../core/IScene';
import {Container, NineSlicePlane, Text, TextStyle, Texture} from 'pixi.js';
import {GameManager} from '../core/GameManager';
import {SimpleNineSliceButton} from '../core/SimpleNineSliceButton';
import {CardDeckDemo} from '../card-deck-demo/CardDeckDemo';
import {MixedTextDemo} from '../mixed-text-demo/MixedTextDemo';
import {FireDemo} from '../fire-demo/FireDemo';

export class MainMenu extends Container implements IScene {
    private readonly _bg: NineSlicePlane;
    private readonly _area1: SimpleNineSliceButton;
    private readonly _area2: SimpleNineSliceButton;
    private readonly _area3: SimpleNineSliceButton;
    private readonly _title: Text;
    private readonly _subTitle: Text;

    constructor() {
        super();

        // Background
        this._bg = new NineSlicePlane(Texture.from('bg'), 185, 190, 310, 105);

        this.addChild(this._bg);

        // Titles
        this._title = new Text('SOFTGAMES Test', new TextStyle({
            fontFamily: 'Tahoma',
            fontSize: 30,
            fontVariant: 'small-caps',
            fontWeight: 'bold',
            fill: '#f37c20',
        }));
        this._title.position.y = 60;
        this._title.anchor.set(0.5, 0);

        this._subTitle = new Text('By Johanny Angarita', new TextStyle({
            fontFamily: 'monospace',
            fontSize: 30,
            fontVariant: 'small-caps',
            fontWeight: 'bold',
            fill: '#34A2DB',
        }));
        this._subTitle.position.y = 100;
        this._subTitle.anchor.set(0.5, 0);

        this.addChild(this._title);
        this.addChild(this._subTitle);

        // Areas
        this._area1 = new SimpleNineSliceButton(Texture.from('area'), 60, 50, 160, 60);
        this._area1.text = 'Card Deck';
        this._area2 = new SimpleNineSliceButton(Texture.from('area'), 60, 50, 160, 60);
        this._area2.text = 'Mixed Text';
        this._area3 = new SimpleNineSliceButton(Texture.from('area'), 60, 50, 160, 60);
        this._area3.text = 'Fire Particle';

        this.addChild(this._area1);
        this.addChild(this._area2);
        this.addChild(this._area3);

        this._area1.on('pointerup', this.onArea1Hit);
        this._area2.on('pointerup', this.onArea2Hit);
        this._area3.on('pointerup', this.onArea3Hit);
    }

    private onArea1Hit() {
        GameManager.changeScene(new CardDeckDemo());
    }

    private onArea2Hit() {
        GameManager.changeScene(new MixedTextDemo());
    }

    private onArea3Hit() {
        GameManager.changeScene(new FireDemo());
    }

    update() {
        // ---
    }

    resize() {
        this._bg.width = GameManager.width;
        this._bg.height = GameManager.height;

        this._title.position.x = GameManager.width / 2;
        this._subTitle.position.x = GameManager.width / 2;

        const borderW = 60;
        const areaW = (this._bg.width - borderW * 2 - borderW) / 3;
        const areas = [this._area1, this._area2, this._area3];

        for (let i = 0; i < areas.length; i++) {
            const area = areas[i];

            area.width = areaW;
            area.height = this._bg.height - 170 - 80;
            area.x = this._bg.x + borderW + ((borderW / 2) * i) + (areaW * i);
            area.y = this._bg.y + 170;
        }
    }
}
