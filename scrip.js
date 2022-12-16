const images = [new Image(),new Image]
images[0].src ='/home/fisheymug/Programming/Tutorials/Chris Courses/MarioGame/images/platform.png'

images[1].src ='/home/fisheymug/Programming/Tutorials/Chris Courses/MarioGame/images/hills.png'



const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = 576;
canvas.width = 1074;

const gravity = 0.5
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 400
        }
        this.width = 30
        this.height = 30
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        ctx.fillStyle =("red")
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {this.velocity.y =0
        }
        
    }
}

class Platform {
    constructor({x, y}, image) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = this.image.width
        this.height = this.image.height

        
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

const player = new Player();

const platforms = [
    new Platform({x: 0, y: 470},images[0]), 
    new Platform({x: 578, y:470}, images[0])
]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

//help determine how far we have gone for win condition
let scrollOffset = 0;

let animationId;
function animate() {
    animationId = requestAnimationFrame(animate);
    ctx.fillStyle = ("white")
    ctx.fillRect(0, 0, canvas.width, canvas.height)
   
    platforms.forEach((platform) => {
        platform.width = images[0].width
        platform.draw()
    })

    player.update()
    ctx.drawImage(images[1], 10, 10)
    if (keys.right.pressed && player.position.x < 300) {
       
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 50) {
        
        player.velocity.x = -5
    }else {
        player.velocity.x = 0
        
        if (keys.right.pressed) {
            platforms.forEach((platform)  => {
                platform.position.x -=5
                scrollOffset += 5
            })
        } else if (keys.left.pressed) {
            platforms.forEach((platform) => {
                scrollOffset -=5
                platform.position.x +=5
            })
        }
    }
    //platform collision detection
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y>= platform.position.y 
            && player.position.x + player.width >= platform.position.x 
            && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y =0;
        }
    })

    if (scrollOffset > 6000) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        console.log('Winner Winner')
        cancelAnimationFrame(animationId)
      }
    console.log(scrollOffset)
}

let imageCount = images.length;
let imagesLoaded = 0;
images.forEach(image => {
    image.onload = function(){
        imagesLoaded++;
        if(imagesLoaded == imageCount){
            allLoaded()
        }
    }
});

function allLoaded() {
    animate()
}


addEventListener('keydown', (event)=> {
    switch (event.keyCode) {
        case 65: 
            keys.left.pressed = true
            break
        case 83:

            break
        case 68:
            keys.right.pressed = true
            break
        case 87:
            player.velocity.y -=5
            break
    }
} )

addEventListener('keyup', (event)=> {
    switch (event.keyCode) {
        case 65: 
        keys.left.pressed = false
            break
        case 83:

            break
        case 68:
            keys.right.pressed = false
            break
        case 87:
            player.velocity.y -=10
            break
    }
})