var balloon,balloonImage1,balloonImage2;
var database;
var position;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

//Function to set initial environment
function setup() {

   database=firebase.database();

  createCanvas(1360,600);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readPosition, showError);



  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    changePosition(-3,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   
  }
  else if(keyDown(RIGHT_ARROW)){
    changePosition(3,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   
  }
  else if(keyDown(UP_ARROW)){
    changePosition(0,-3);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   
    balloon.scale=0.5;
  }
  else if(keyDown(DOWN_ARROW)){
    changePosition(0,+3);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    
    balloon.scale=0.3;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function changePosition(x,y)
{
database.ref("balloon/position").set({
'x':position.x+x,
'y':position.y+y

})
}

function readPosition(data)
{
position=data.val()
balloon.x=position.x;
balloon.y=position.y;
}



function showError(){
  console.log("Error in writing to the database");
}