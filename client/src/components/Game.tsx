import "phaser";

export default class Game extends Phaser.Scene {
    introText: any;
    objects: {
        camera?: Phaser.Cameras.Scene2D.Camera;
    } = {};

    constructor() {
        super({
            key: "Game",
        });
    }

    preload() {}

    create() {
        const intro = this.add.text(250, 250, "Welcome to Zodiac", {
            fontSize: 24,
            color: "#42f5d4",
        });
        intro.setOrigin(0.5);
        this.objects.camera = this.cameras.add(0, 0, 750, 800);
        this.objects.camera.setBackgroundColor("rgba(255, 255, 255, 0.3)");

        const memory = this.createMemory();
        this.textures.addCanvas("memory", memory);
        const memoryImage = this.add.sprite(0, 0, "memory");

        var style = {
            font: "18px Arial",
            fill: "#fff",
            wordWrap: true,
            wordWrapWidth: memoryImage.width,
            align: "center",
        };

        const text = this.add.text(0, 0, "memory", style);
        text.setOrigin(0.5);
        const container = this.add
            .container(100, 100, [memoryImage, text])
            .setSize(100, 100);
    }

    update() {}

    createMemory() {
        const memory = document.createElement("canvas");
        memory.width = 100;
        memory.height = 88;
        const ctx = memory.getContext("2d");

        if (ctx) {
            let size = 50,
                x = 50,
                y = 44;
            ctx.beginPath();
            ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
            // ctx.moveTo(0, 0);

            for (let side = 0; side < 7; side++) {
                ctx.lineTo(
                    x + size * Math.cos((side * 2 * Math.PI) / 6),
                    y + size * Math.sin((side * 2 * Math.PI) / 6)
                );
            }

            // ctx.fillStyle = "#333333";
            ctx.stroke();

            // ctx.fillStyle = "white";
            // ctx.fillRect(0, 0, memory.width, memory.height);
        }

        return memory;
    }
}
