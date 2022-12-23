import {Container, DisplayObject, Sprite, Text, TextStyle} from 'pixi.js';
import {Utils} from '../core/Utils';
import {GameManager} from '../core/GameManager';
import {Texture} from '@pixi/core';

export class MixedText extends Container {
    private readonly UTF8_ICONS = ['🍎', '🍕', '🌹', '⏰', '⛄'];
    private readonly WORDS = ['so', 'much', 'depends', 'upon', 'a', 'red', 'wheel', 'barrow', 'glazed', 'with', 'rain', 'water', 'beside', 'the', 'white', 'chickens'];
    private readonly IMGS = ['img-1', 'img-2', 'img-3', 'img-4', 'img-5'];

    private _downSpeed = 1;

    constructor() {
        super();

        this._downSpeed = Utils.getRandomFloat(1, 7);

        this.createText();
    }

    public update(delta: number) {
        this.y += this._downSpeed * delta;

        if (this.y > GameManager.height + 20) {
            this.removeFromParent();
        }
    }

    private createText() {
        const elements = Utils.getRandomInt(3, 5);

        for (let i = 0; i < elements; i++) {
            const tx = this.getRandomText();
            tx.x = this.width + (this.width === 0 ? 0 : 10);
            this.addChild(tx);
        }

        this.position.y = -50;
        this.position.x = Utils.getRandomFloat(0, GameManager.width - this.width);
        this.angle = Utils.getRandomFloat(-35, 35);
    }

    private getRandomText(): DisplayObject {
        const textTypes = ['text', 'icon', 'images'];
        const style = new TextStyle({
            fontSize: Utils.getRandomFloat(12, 60),
            fontStyle: Utils.getRandomItem(['normal', 'italic']),
            fontFamily: Utils.getRandomItem(['arial', 'verdana', 'monospace']),
        });

        const type = Utils.getRandomItem(textTypes);

        if (type === textTypes[0]) {
            const tx = new Text(Utils.getRandomItem(this.WORDS), style);
            tx.anchor.set(0, 0.5);
            return tx;
        } else if (type === textTypes[1]) {
            const tx = new Text(Utils.getRandomItem(this.UTF8_ICONS), style);
            tx.anchor.set(0, 0.5);
            return tx;
        } else {
            const img = Utils.getRandomItem(this.IMGS);
            const sp = new Sprite(Texture.from(img));
            sp.scale.set(0.3);
            sp.anchor.set(0, 0.5);

            return sp;
        }
    }
}
