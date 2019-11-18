'use strict'
const keysCode = {
    ARROW_LEFT : '37',
    ARROW_UP : '38',
    ARROW_RIGHT : '39',
    ARROW_DOWN : '40',
    ESPACE : '32'
};

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = innerWidth;
const height = canvas.height = innerHeight;

var frames = 0;

const background = {
    image : new Image(),
    show : function(){
        this.image.src = 'images/background/background.png';
        
        context.fillStyle = "skyblue";
        context.fillRect(0,0,width,height);
        
        context.drawImage(this.image, 0,height-this.image.height);
        context.drawImage(this.image, this.image.width,height-this.image.height);
        context.drawImage(this.image, 2*this.image.width,height-this.image.height);
        context.drawImage(this.image, 3*this.image.width,height-this.image.height);
        context.drawImage(this.image, 4*this.image.width,height-this.image.height);
        
    }

};
const foreground = {
    image : new Image(),
    x : 0,
    y : height - 109,
    show : function(){
        this.image.src = 'images/foreground/foreground.png';
        context.drawImage(this.image, this.x, this.y);
        context.drawImage(this.image, this.x + this.image.width, this.y);
        context.drawImage(this.image, this.x + this.image.width*2, this.y);
        context.drawImage(this.image, this.x + this.image.width*3, this.y);
        context.drawImage(this.image, this.x + this.image.width*4, this.y);
        context.drawImage(this.image, this.x + this.image.width*5, this.y);
        context.drawImage(this.image, this.x + this.image.width*6, this.y);
        
    }
};

const player = {
    image : new Image(),
    character : {
        dinasour : {
            animation : {
                 idle:     [
                    'images/sprites/Dinasaur/Idle (1).png',
                    'images/sprites/Dinasaur/Idle (2).png',
                    'images/sprites/Dinasaur/Idle (3).png',
                    'images/sprites/Dinasaur/Idle (4).png',
                    'images/sprites/Dinasaur/Idle (5).png',
                    'images/sprites/Dinasaur/Idle (6).png',
                    'images/sprites/Dinasaur/Idle (7).png',
                    'images/sprites/Dinasaur/Idle (8).png',
                    'images/sprites/Dinasaur/Idle (9).png',
                    'images/sprites/Dinasaur/Idle (10).png'

                ],
                idle_left:     [
                    'images/sprites/Dinasaur/Idle (1)-L.png',
                    'images/sprites/Dinasaur/Idle (2)-L.png',
                    'images/sprites/Dinasaur/Idle (3)-L.png',
                    'images/sprites/Dinasaur/Idle (4)-L.png',
                    'images/sprites/Dinasaur/Idle (5)-L.png',
                    'images/sprites/Dinasaur/Idle (6)-L.png',
                    'images/sprites/Dinasaur/Idle (7)-L.png',
                    'images/sprites/Dinasaur/Idle (8)-L.png',
                    'images/sprites/Dinasaur/Idle (9)-L.png',
                    'images/sprites/Dinasaur/Idle (10)-L.png'

                ],
                walk_right: [
                    'images/sprites/Dinasaur/Walk (1).png',
                    'images/sprites/Dinasaur/Walk (2).png',
                    'images/sprites/Dinasaur/Walk (3).png',
                    'images/sprites/Dinasaur/Walk (4).png',
                    'images/sprites/Dinasaur/Walk (5).png',
                    'images/sprites/Dinasaur/Walk (6).png',
                    'images/sprites/Dinasaur/Walk (7).png',
                    'images/sprites/Dinasaur/Walk (8).png',
                    'images/sprites/Dinasaur/Walk (9).png',
                    'images/sprites/Dinasaur/Walk (10).png',
                    'images/sprites/Dinasaur/Walk (10).png'
                    
                ],
                walk_left: [
                    'images/sprites/Dinasaur/Walk (1)-l.png',
                    'images/sprites/Dinasaur/Walk (2)-l.png',
                    'images/sprites/Dinasaur/Walk (3)-l.png',
                    'images/sprites/Dinasaur/Walk (4)-l.png',
                    'images/sprites/Dinasaur/Walk (5)-l.png',
                    'images/sprites/Dinasaur/Walk (6)-l.png',
                    'images/sprites/Dinasaur/Walk (7)-l.png',
                    'images/sprites/Dinasaur/Walk (8)-l.png',
                    'images/sprites/Dinasaur/Walk (9)-l.png',
                    'images/sprites/Dinasaur/Walk (10)-l.png'           
                ],
                jump: [
    
                    'images/sprites/Dinasaur/Jump (6).png'

                ]
                
            }
        }
    },
    x : 40,
    y : foreground.y-470/4+15,
    velocity : {
        x: 2,
        y: 0
    },
    jump : 20,
    gravity : 1,
    frame : 0,
    PERIOD : 3,
    width : 680/4+20,
    height : 470/4,
    show : function(){
        
        this.image.src = current_animation[this.frame];
        
        context.drawImage(this.image, this.x,this.y, this.width,this.height);
    },
    update : function(){
        this.frame += frames%this.PERIOD == 0? 1: 0;
        this.frame %= current_animation.length;
        
        this.y += this.velocity.y;
        
        if(this.y + this.height -15 >= foreground.y){
           this.velocity.y = 0;
        }else{
            this.velocity.y += this.gravity;
        }
        if(this.velocity.x == 5){
            current_animation = current_character.animation.idle;
        }
        if(this.velocity.x == -2 * (1 + 1) - 1){
            current_animation = current_character.animation.idle_left;
        }
        if(this.velocity.y < 0){
            current_animation = current_character.animation.jump;
        }
        if(this.velocity.x >= 5){
            this.velocity.x = 5;
        }
        if(this.velocity.x <= -5){
            this.velocity.x = -5;
        }
    }

};
const zombie = {
    position : [],
    image : new Image(),
    animation : {
        walk : [
            'images/sprites/Zombies/Walk (1).png',
            'images/sprites/Zombies/Walk (2).png',
            'images/sprites/Zombies/Walk (3).png',
            'images/sprites/Zombies/Walk (4).png',
            'images/sprites/Zombies/Walk (5).png',
            'images/sprites/Zombies/Walk (6).png',
            'images/sprites/Zombies/Walk (7).png',
            'images/sprites/Zombies/Walk (8).png',
            'images/sprites/Zombies/Walk (9).png',
            'images/sprites/Zombies/Walk (10).png',
        ]
    },
    show : function(){
        this.image.src = current_Zombie_animation[this.frame];
        for(let i=0; i<this.position.length; i++){
            let p = this.position[i]
            context.drawImage(this.image, p.x,p.y,p.w,p.h);
            p.x--;
            if(frames%100 == 0){
                this.position.push({
                    x : 30,
                    y : foreground.y - 518/3+24,
                    w : 430/3-20,
                    h : 518/3-20
                })
            }
            p.x--;
        }
        
    },
    frame : 0,
    x : width,
    y : foreground.y - 518/3+24,
    w : 430/3-20,
    h : 518/3-20,
    PERIOD : 5,
    update : function(){
        this.frame += frames%this.PERIOD == 0? 1: 0;
        this.frame %= current_Zombie_animation.length;
        
    }
    
};
var zombies = [];

var current_character = player.character.dinasour;
var current_animation = current_character.animation.idle;

var current_Zombie_animation = zombie.animation.walk;

function draw(){
    background.show();
    foreground.show();
    player.show();
    zombie.show();
} 

function update(){
    frames++;
    player.update();
    zombie.update();
}

function loop(){
    draw();
    update();
    requestAnimationFrame(loop);
}
loop();
function key_down(evet,e){
    if(evet.keyCode == keysCode.ESPACE ){
        if(player.y + player.height - 15 >= foreground.y){
            player.velocity.y = -player.jump
        }
    }
    else if(evet.keyCode == keysCode.ARROW_LEFT){
        player.x += player.velocity.x;
        player.velocity.x -= 5;
        current_animation = current_character.animation.walk_left;
      
    }
   else if(evet.keyCode == keysCode.ARROW_RIGHT){
        player.x += player.velocity.x ;
        player.velocity.x += 5;
        current_animation = current_character.animation.walk_right;
    }
}
function key_up(){
    if(player.velocity.x >= 5){
        player.velocity.x = 5;
    }else if(player.velocity.x <= 0){
        player.velocity.x = -5;
    }
    player.velocity.y = 0;
    
}
document.addEventListener('keydown', key_down);
document.addEventListener('keyup', key_up)