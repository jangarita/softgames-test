import {Container} from 'pixi.js';

export interface IScene extends Container {
    update(delta: number): void;

    resize(): void;
}
