import 'phaser';

export default class Game extends Phaser.Scene {
    introText: any;
    objects: {
        camera?: Phaser.Cameras.Scene2D.Camera
    } = {}
    

    constructor() {
        super({
            key: 'Game'
        })
    }

    preload() {

    }

    create() {
        this.introText = this.add.text(250, 250, 'Welcome to Zodiac', {
            fontSize: 24,
            color: '#42f5d4'
        })
        this.objects.camera = this.cameras.add(0,0,500,500);
        this.objects.camera.setBackgroundColor('rgba(255, 0, 0, 0.5)');


    }

    update() {

    }
}