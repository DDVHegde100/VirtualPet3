var  dog, happyDog;
var foodStock, lastFed
var database;
var foodS, foodStock;
var bedroom, garden, washroom;
function preload()
{
  dogImg = loadImage("dogImg.png");
  dogImg1 = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.4;
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

    currentTime=hour();
    if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
    }else if(currentTime==(lastFed+2)){
update("Sleeping");
foodObj.bedroom();
    }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
update("Bathing");
foodObj.washroom();
    }else{
      update("Hungry")
      foodObj.display();
    }
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
    if(gameState!="Hungry"){
      feed.hide();
      addFoods.hide();
      dog.remove();
    }else{
      feed.hide();
      addFoods.show();
      dog.addImage(sadDog);
    }
  }

  drawSprites();
  strokeWeight()
  stroke("red");

  text("Food Remaining:" + foodS, 250,480);
}

function readStock(data){
  foodS=data.val();
}

function writeStock (x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x 
  })
}
function feedDog() {
  food1.getFoodStock();
  food1.updateFedTime();

  if(foodCount===0){
foodCount=0;
milk.visible=false;
dog.addImage(dogImg);
  }else{
    food1.updateFoodStock(foodCount-1);
    milk.visible=true;
    dog.addImage(happyDogImg);
  }
}

function addFoods(){
  food1.getFoodStock();
  food1.updateFoodStock(foodCount+1);
}