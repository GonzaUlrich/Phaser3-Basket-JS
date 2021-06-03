var hoop, frontRim, leftRim, rightRim, bounceRims, netRims1, netRims2
var ball
var startMouseX, startMouseY, endMouseX, endMouseY
var xForce = -700
var onClick = false
var launched = false
var isBelowHoop = true
var win = true
var lose = true
var winAnim=false
var winImg0,winImg1,winImg2,loseImg0,loseImg1,loseImg2
var winGroup=[]
var loseGroup=[]

let MyScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function myscene() {
    Phaser.Scene.call(this, {
      key: 'myscene',
    })
  },

  preload: function () {
    this.load.image('ball', 'Img/ball.png')
    this.load.image('hoop', 'Img/hoop.png')
    this.load.image('frontRim', 'Img/frontRim.png')

    this.load.image('winImg0', 'Img/winImg0.png')
    this.load.image('winImg1', 'Img/winImg1.png')
    this.load.image('winImg2', 'Img/winImg2.png')

    this.load.image('loseImg0', 'Img/loseImg0.png')
    this.load.image('loseImg1', 'Img/loseImg1.png')
    this.load.image('loseImg2', 'Img/loseImg2.png')
    
  },

  create: function () {
      
    this.physics.world.gravity.y = 300

    hoop = this.add.sprite(200, 180, 'hoop')
    frontRim = this.add.sprite(200, 220, 'frontRim')
    frontRim.setScale(.73)

    leftRim = this.physics.add.staticImage(123, 155)
    leftRim.setCircle(5)

    rightRim = this.physics.add.staticImage(299, 155)
    rightRim.setCircle(5)

    netRims1 = this.physics.add.staticImage(274, 200)
    netRims1.setCircle(5)

    netRims2 = this.physics.add.staticImage(148, 200)
    netRims2.setCircle(5)

    //-----
    
    ball = this.physics.add.sprite(200, 550, 'ball').setInteractive()
    ball.setScale(.45)
    ball.setCircle(120, 5, 5)
    ball.setBounce(.7)
    ball.body.setAllowGravity(false)
    winGroup.push(winImg0)
    winGroup.push(winImg1)
    winGroup.push(winImg2)
    loseGroup.push(loseImg0)
    loseGroup.push(loseImg1)
    loseGroup.push(loseImg2)

    ball.on('pointerdown', () => this.click())
    this.input.on('pointerup', () => this.release())
  },

  update: function () {
    if(ball.body.position.y > game.config.height+50 || ball.body.position.x >  game.config.height ||  ball.body.position.x < -300){
        this.resetValues();
    }
    if(ball.body.position.y < leftRim.body.position.y- 69){
        isBelowHoop=false;
    }

    if (!isBelowHoop ) {
        if(ball.body.position.x > leftRim.body.position.x-50 && ball.body.position.x < rightRim.body.position.x){
            if(ball.body.position.y > leftRim.body.position.y - 50){
                this.winFunc() 
            }
        }else{
            if(!winAnim){
                this.looseFunc()
            }
            
        }
	}
    if(!isBelowHoop){
        this.physics.add.collider(ball,rightRim);
        this.physics.add.collider(ball,leftRim);
        //this.physics.add.collider(ball,netRims1);
        //this.physics.add.collider(ball,netRims2);
        frontRim.setDepth(1)
    }
    else{
        this.physics.world.colliders.destroy();
    }

  },

  resetValues: function () {
    ball.setScale(.45)
    ball.body.position.x = 150
    ball.body.position.y = 500
    ball.body.setVelocityY(0)
    ball.body.setVelocityX(0)
    ball.body.setAllowGravity(false)
    ball.body.setAllowGravity(false)
    isBelowHoop=true;
    frontRim.setDepth(-1)
    win=true
    lose=true
    winAnim=false
    location.href = 'https://www.google.com.ar';
  },

  click: function () {
    startMouseX = game.input.mousePointer.x
    startMouseY = game.input.mousePointer.y
    onClick = true
  },

  release: function () {
    if (onClick) {
      onClick = false
      endMouseX = game.input.mousePointer.x
      endMouseY = game.input.mousePointer.y
      if (endMouseY < startMouseY) {
        var slope = [endMouseX - startMouseX, endMouseY - startMouseY]
        var xTraj = xForce * slope[0] / slope[1]
        if(xTraj>300){
            xTraj=300;
        }
        if(xTraj>300){
            xTraj=300;
        }
        if(xTraj<-300){
            xTraj=-300;
        }
        this.launch(xTraj)
      }
    }
  },

  launch: function (xTraj) {
    ball.body.setAllowGravity(true)
    ball.setVelocityY(-550)
    ball.setVelocityX(xTraj)
    ball.body.velocity.x = xTraj
    this.tweens.add({
      targets: ball,
      scaleX: 0.3,
      scaleY: 0.3,
      ease: 'Linear',
      duration: 1000,
      repeat: 0,
      yoyo: false
    })
  },
  winFunc: function (){
    if(win){
        win=false;
        winAnim=true;
        let num = Math.floor(Math.random() * 3)
        let imageName = "winImg" + num
        winGroup[num] = this.add.sprite(200, 300, imageName)

        let appear = this.tweens.add({
            targets:winGroup[num],
            y:400,
            ease: 'Elastic',
            duration: 500,
            repeat: 0,
            yoyo: false
        })
        let fade = this.tweens.add({
            targets:winGroup[num],
            alpha:0,
            ease: 'Linear',
            duration: 1200,
            repeat: 0,
            yoyo: false
        })
    }
  },

  looseFunc: function (){
    if(lose){
        lose=false;
        let num = Math.floor(Math.random() * 3)
        let imageName = "loseImg" + num
        loseGroup[num] = this.add.sprite(200, 300, imageName)

        let appear = this.tweens.add({
            targets:loseGroup[num],
            y:400,
            ease: 'Elastic',
            duration: 500,
            repeat: 0,
            yoyo: false
        })
        let fade = this.tweens.add({
            targets:loseGroup[num],
            alpha:0,
            ease: 'Linear',
            duration: 1000,
            repeat: 0,
            yoyo: false
        })
    }
  }

})



var config = {
  type: Phaser.AUTO,
  width: 400,
  height: 625,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 150 }
    }
  },
  pixelArt: false,//here
  //antialias: false,
  scene: [MyScene]
}


var game = new Phaser.Game(config)