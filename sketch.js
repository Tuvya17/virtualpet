//Create variables here
var dog, happydog1, happydog2, foodS, foodStock

function preload()
{
	//load images here
  happydog1 = loadImage("images/dogImg.png");
  happydog2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  dog = createSprite(400,350,50,50);
  dog.addImage("dogimg1",happydog1);
  dog.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodobj = new Food();
}


function draw() {  
  background(46, 139, 87);
  foodobj.display();
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydog2);
    dog.scale = 0.3;
  }
  drawSprites();
  textSize(40);
  fill("black");
  text("FOOD REMAINING: "+ foodS,170,200);
  
 
}


function readStock(data){

   foodS = data.val();
   foodobj.updateFoodStock(foodS);
   console.log(foodS);
} 

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}



