import {Container, NineSlicePlane, Text, Texture} from 'pixi.js';

export class Card extends Container {
    private readonly _bg: NineSlicePlane;
    private readonly _text: Text;

    constructor(text: string) {
        super();

        this._bg = new NineSlicePlane(Texture.from('card'), 55, 15, 55, 15);

        this._text = new Text(text);
        this._text.pivot.set(this._text.width / 2, this._text.height / 2);
        this._text.x = this._bg.width / 2;
        this._text.y = this._bg.height / 2;

        this.addChild(this._bg);
        this.addChild(this._text);
    }
}
