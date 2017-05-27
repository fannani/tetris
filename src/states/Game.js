

import Phaser from 'phaser'

export default class Game extends Phaser.State {

    preload(){

    }
    init(){
        this.padding = 10;
        this.blockSize = 30;
        this.blockWidth = 12;
        this.blockHeight = 17;

        this.offset = 5;

        this.spawn = [[1,0],[1,1]];
        this.y = 0;
        this.space = new Array(this.blockHeight);
        for(var i = 0;i<this.space.length;i++){
            this.space[i] = new Array(this.blockWidth);
        }

    }

    create(){
        this.batas = this.add.graphics(this.padding,this.padding);
        this.batas.lineStyle(1, 0xffffff, 1);
        this.batas.moveTo(0,0);
        this.batas.lineTo(0, this.blockSize * this.blockHeight);
        this.batas.lineTo(this.blockSize * this.blockWidth, this.blockSize * this.blockHeight);
        this.batas.lineTo(this.blockSize * this.blockWidth, 0);
        this.batas.endFill();

        this.blockGraph = game.add.bitmapData(this.blockSize,this.blockSize);
        this.blockGraph.ctx.beginPath();
        this.blockGraph.ctx.rect(0,0,this.blockSize,this.blockSize);
        this.blockGraph.ctx.fillStyle = '#ffffff';
        this.blockGraph.ctx.fill();

        this.createNewBlock();
        this.timer = this.time.create(false);

        this.timer.loop(500, this.blockCounter.bind(this), this);
        this.timer.start();
    }
    createNewBlock(){
        this.y = 0;
        this.sprite = [];

        for(var i = 0;i<this.spawn.length;i++){
            for(var a = 0;a<this.spawn[i].length;a++){
                if(this.spawn[i][a] == 1){
                    var y = this.padding + this.blockSize * i;
                    var x = this.padding + this.blockSize * a;
                    this.sprite.push(this.add.sprite(x, y, this.blockGraph));
                }
            }
        }
    }
    update(){

    }
    blockCounter() {
        var empty = false;
        if(this.y + this.spawn.length < this.blockHeight){
            empty = true;
        }
        if(empty){
            for(var i = 0;i<this.sprite.length;i++){
                this.sprite[i].y += this.blockSize;
            }
            this.y++;
        } else {
            for(var i = 0;i<this.sprite.length;i++){
                this.sprite[i].destroy();
            }
            for(var i = 0;i<this.spawn.length;i++) {
                for (var a = 0; a < this.spawn[i].length; a++) {
                    if (this.spawn[i][a] == 1) {
                        var graphics = game.add.graphics( this.padding + (a * this.blockSize),this.padding + ((this.y+i) * this.blockSize));
                        graphics.beginFill(0xFFFFFF);
                        graphics.lineStyle(0, 0xffffff, 1);
                        graphics.moveTo(0,0);
                        graphics.lineTo(0, this.blockSize);
                        graphics.lineTo(this.blockSize, this.blockSize);
                        graphics.lineTo(this.blockSize, 0);
                        graphics.endFill();

                    }
                }
            }
            this.createNewBlock();
        }



    }
}