

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

        this.spawn = [[0,1,0],[1,1,1],[0,0,0]];
        this.x = 0;
        this.y = 0;
        this.downState = false;
        this.area = [];
        for(var i = 0;i<this.blockHeight;i++){
            this.area.push(new Array(this.blockWidth).fill(0));
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

        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    }
    createNewBlock(){
        this.y = 0;
        this.sprite = [];

        this.spawn.forEach(function(item,i){
            item.forEach(function(data,a){
                if(data == 1){
                    var y = this.padding + this.blockSize * i;
                    var x = this.padding + this.blockSize * a;
                    this.sprite.push(this.add.sprite(x, y, this.blockGraph));
                }
            }.bind(this));
        }.bind(this));
    }
    update(){
        console.log(this.downState);
        if(this.rightKey.isUp && this.leftKey.isUp && this.upKey.isUp){
            this.downState = false;
        }
        if (this.rightKey.isDown && !this.downState) {
            this.downState = true;
            this.x++;
            this.sprite.forEach(function(item,i) {
                this.sprite[i].x += this.blockSize;

                console.log(this.x);

            }.bind(this));
        } else if(this.leftKey.isDown && !this.downState){
            this.downState = true;
            this.x--;
            this.sprite.forEach(function(item,i){
                this.sprite[i].x -= this.blockSize;

            }.bind(this));
        } else if(this.upKey.isDown && !this.downState){
            this.rotateBlock();
        }
    }
    roteteBlock(){

    }
    blockCounter() {
        var empty = false;

        if(this.y + this.spawn.length <= this.blockHeight){
            empty = true;
        }
        if(empty){
            this.sprite.forEach(function(item,i){
                this.sprite[i].y += this.blockSize;
            }.bind(this));
            this.y++;
        } else {
            this.sprite.forEach(function(item,i){
                this.sprite[i].destroy();
            }.bind(this));
            console.log(this.x);
            this.spawn.forEach(function(item,row){
               item.forEach(function(data,col){
                   if(data == 1){
                       this.area[row + this.y ][col+this.x] = 1;
                   }
               }.bind(this));
            }.bind(this));
            console.table(this.area);
            this.drawArea();
            this.createNewBlock();
        }
    }

    drawArea(){
        this.spawn.forEach(function(item,i){
            item.forEach(function(data,a){
                if(data == 1){
                    var y = this.padding + this.blockSize * (this.y+i);
                    var x = this.padding + this.blockSize * (this.x+a);
                    var graphics = this.add.graphics(x, y);

                    graphics.beginFill(0xFFFFFF);
                    graphics.moveTo(0,0);
                    graphics.drawRect(0,0,this.blockSize,this.blockSize);
                    graphics.endFill();
                }
            }.bind(this));
        }.bind(this));
    }
}