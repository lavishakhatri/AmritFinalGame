var tower,towerImage
var door,doorImage
var batman,batmanImage
var joker,jokerImage
var doorGroup
var fireImage
var fireGroup
var gameState="play"
var batmanDie=0,jokerDie=0
var batmanScore=0,jokerScore=0
var finalDoor,finalDoorImage;
var batmanEscaped=false;
var spookySound
function preload(){
    towerImage=loadImage("tower.png")
    doorImage=loadImage("door.png")
    batmanImage=loadImage("batman.png")
    jokerImage=loadImage("joker.png")
    fireImage=loadImage("fire.png")
    finalDoorImage=loadImage("final door.png")
    spookySound=loadSound("spooky.wav")
}
function setup(){
    createCanvas(600,600)
    spookySound.loop()
    tower=createSprite(300,300)
    tower.addImage(towerImage)
    tower.velocityY=4
    doorGroup=new Group()
    fireGroup=new Group()

    batman=createSprite(200,200)
    batman.addImage(batmanImage)
    batman.scale=0.2

    joker=createSprite(300,300)
    joker.addImage(jokerImage)
    joker.scale=0.2

    
}
function draw(){
    background('white')
    
    if(gameState==="play"){
    if(tower.y>600){
        tower.y=300
    }
if(keyDown("space")){
batman.velocityY=-10

}

batman.velocityY=batman.velocityY+0.5
joker.velocityY=joker.velocityY+0.5

if(keyDown("left")){
batman.x=batman.x-3

}
if(keyDown("right")){
    batman.x=batman.x+3
    }


if(keyDown("a")){
    joker.x=joker.x-3
}
if(keyDown("s")){
    joker.velocityY=-10
}
if(keyDown("d")){
    joker.x=joker.x+3
}


if(joker.isTouching(doorGroup)){
    joker.velocityY=0
    jokerScore++
}

/*if(batman.isTouching(doorGroup)){
    batman.velocityY=0
    batmanScore++
}
*/
for (var i=0;i<doorGroup.length;i++)
{
    if(doorGroup.get(i).isTouching(batman))
    {
        doorGroup.get(i).destroy()
            batmanScore++
    }
    
}



spawnDoors()

spawnFire()





    if(batman.isTouching(fireGroup)|| batman.y>600)
    {
        batmanDie=1
        batman.destroy()
        gameState="end"
    }
    if(joker.isTouching(fireGroup)|| joker.y>600){
       jokerDie=1
        joker.destroy()
       //joker.velocityY=-20
      // gameState = "end"
    }
   if(batmanScore===5|| jokerScore>20){
       finalDoor=createSprite(300,50)
       finalDoor.addImage(finalDoorImage)
      // finalDoor.velocityY=3
       finalDoor.scale=0.5
       finalDoor.depth=batman.depth
       finalDoor.depth=joker.depth
       if(batman.isTouching(finalDoor)){
            batmanEscaped=true
           //jokerDie=1
           gameState="end"
       }
   }
    
   drawSprites()

    }
    else if(gameState==="end")
    
    {
        background("black")
        if(batmanEscaped ===true)
        {
            joker.destroy();
            textSize(50)
        stroke("red")
        fill("blue")
            text("Batman has Escaped & he Won !!", 300,300)
        }
        if(batmanDie===1)
    {
        //console.log("Hello")
        textSize(50)
        stroke("red")
        fill("blue")
        text("BatMan U Loose!",150,150)
    }
    else
    if(jokerDie===1){
        text("Joker U Loose!",150,150)
    }
   
        textSize(50)
        stroke("red")
        fill("blue")
        text("gameOver",200,200)
    }
    
    textSize(20)
    fill("blue")
    text("Batman: " + batmanScore,20,40)
    text("Joker: " + jokerScore,500,40)
    
}
function spawnDoors (){
    if(frameCount%150===0){
        door=createSprite(200,-50)
        door.velocityY=4
        door.x=random(120,400)
        door.addImage(doorImage)
        door.depth=batman.depth
        batman.depth++
        joker.depth=door.depth+1

        doorGroup.add(door)
         door.lifetime=800
        
    }
}

function spawnFire  (){
    if(frameCount%200===0){
        fire=createSprite(100,50)
        fire.velocityY=4
        fire.x=random(100,400)
        fire.addImage(fireImage)
        fire.scale=0.5
        //door.depth=batman.depth
       // batman.depth++
        //joker.depth=door.depth+1

        fireGroup.add(fire)
        


    }
}
