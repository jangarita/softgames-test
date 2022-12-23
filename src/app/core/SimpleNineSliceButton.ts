import {NineSlicePlane, Text} from 'pixi.js';
import {Texture} from '@pixi/core';

export class SimpleNineSliceButton extends NineSlicePlane {
    private _text: Text | undefined;

    constructor(texture: Texture, leftWidth?: number, topHeight?: number, rightWidth?: number, bottomHeight?: number) {
        super(texture, leftWidth, topHeight, rightWidth, bottomHeight);

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

    private pointerUpHandler() {
        this.pointerOverHandler();
    }

    set text(value: string) {
        if (!this._text) {
            this._text = new Text(value);
            this._text.anchor.set(0.5, 0.5);
            this._text.position.set(this.width / 2, this.height / 2);

            this.addChild(this._text);
        } else {
            this._text.text = value;
        }
    }

    set width(value: number) {
        super.width = value;

        if (this._text) {
            this._text.position.x = (value / 2);
            this._text.scale.set(1, 1);
            this._text.scale.set(Math.min((value - 35) / this._text.width, 1));
        }
    }

    set height(value: number) {
        super.height = value;

        if (this._text) {
            this._text.position.y = (value / 2);
        }
    }
}
