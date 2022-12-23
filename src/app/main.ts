import {GameManager} from './core/GameManager';
import {Loading} from './loading/Loading';

window.addEventListener('load', () => {
    console.log('\u21E2 SOFTGAMES Test Project by Johanny Angarita \u21E0');

    startApp();
    resize();
}, {once: true});


window.addEventListener('resize', resize);

function startApp() {
    GameManager.start();
    GameManager.changeScene(new Loading());

    /*document.body.onclick = () => {
        document.documentElement.requestFullscreen().then();
    };*/
}

function resize() {
    GameManager.resize();
}
