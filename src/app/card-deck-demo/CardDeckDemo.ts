import {Assets, Container, FederatedPointerEvent, Sprite, Texture} from 'pixi.js';
import {IScene} from '../core/IScene';
import {Card} from './Card';
import {GameManager} from '../core/GameManager';
import {gsap} from 'gsap';
import {PixiPlugin} from 'gsap/PixiPlugin';
import {BackButton} from '../core/BackButton';

export class CardDeckDemo extends Container implements IScene {
    private readonly CARD_NUMBER = 144;
    private readonly ANIMATION_TIME = 2; // in seconds
    private readonly ANIMATION_DELAY_TIME = 1; // in seconds
    private readonly POSITION_GAP_X = 1;
    private readonly POSITION_GAP_Y = 1;

    private _cards: Card[] = [];
    private _bg!: Sprite;
    private _clickMessage!: Sprite;
    private _backButton!: BackButton;

    constructor() {
        super();

        gsap.registerPlugin(PixiPlugin);

        this.sortableChildren = true;

        this.load().then();
    }

    private async load() {
        await Assets.loadBundle('CardDeckDemo');

        this.start();
    }

    private start() {
        // Background
        this._bg = new Sprite(Texture.EMPTY);
        this._bg.interactive = true;
        this.on('pointerup', this.onPointerUpHandler);

        this.addChild(this._bg);

        // Click message
        this._clickMessage = new Sprite(Texture.from('click-to-move'));
        this._clickMessage.anchor.set(0.5, 0);
        this._clickMessage.x = GameManager.width / 2;
        this._clickMessage.y = GameManager.height / 2;

        this.addChild(this._clickMessage);

        // Cards
        for (let i = 0; i < this.CARD_NUMBER; i++) {
            const card = new Card((i + 1).toString());
            this._cards.push(card);

            card.x = 20 + (i * this.POSITION_GAP_X) + card.width / 2;
            card.y = 20 + (i * this.POSITION_GAP_Y) + card.height / 2;
            card.pivot.set(card.width / 2, card.height / 2);
        }

        for (const card of this._cards) {
            this.addChild(card);
        }

        // Back button
        this._backButton = new BackButton();
        this._backButton.position.set(25, GameManager.height - 25);

        this.addChild(this._backButton);

        // ---
        this.resize();
    }

    private onPointerUpHandler(evt: FederatedPointerEvent) {
        this._cards.reverse();

        for (let i = 0; i < this._cards.length; i++) {
            const card = this._cards[i];

            gsap.to(card, {
                pixi: {
                    positionX: evt.clientX + (i * this.POSITION_GAP_X),
                    positionY: evt.clientY + (i * this.POSITION_GAP_Y),
                    zIndex: 0
                },
                startAt: {zIndex: this._cards.length * 50},
                delay: this.ANIMATION_DELAY_TIME * i,
                duration: this.ANIMATION_TIME,
                overwrite: true,
            });
        }
    }

    update(): void {
        //---
    }

    resize(): void {
        if (this._bg) {
            this._bg.width = GameManager.width;
            this._bg.height = GameManager.height;
        }

        if (this._clickMessage) {
            this._clickMessage.x = GameManager.width / 2;
            this._clickMessage.y = GameManager.height / 2;
            this._clickMessage.scale.set(1, 1);
            this._clickMessage.scale.set(Math.min((GameManager.width - 50) / this._clickMessage.width, 1));
        }

        if (this._backButton) {
            this._backButton.y = GameManager.height - 25;
        }
    }
}
