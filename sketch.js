var dog,sadDog,happyDog;
var foodS,foodStock;
var addFood;
var foodObj;
var firebase,database,canvas;

//create feed and lastFed variable here
var lastFed,feed 

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {

  database=firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  var dogi = database.ref('Food');
  dogi.on("value", readPosition);

  feed = createButton("Feed Drago")
  feed.position(830,65);
  feed.mousePressed(FeedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  LastFed = data.val();
})
 
  //write code to display text lastFed time here
  fill(255,255,254);
  textSize(15);
  text("Last Fed:"+ LastFed+" hr",100,40);
 
  drawSprites();
}

function readPosition(data){
  position = data.val();
  foodObj.updateFoodStock(position)
}


//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writePosition(something){
  if(something>0){
    something=something-1
  }
  else{
    something=0
  }
  database.ref('/').set({
    'Food': something
  })

}

function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  if(button.isPressed){
    foodStock=foodStock-1
    foodObj.updateFoodStock(foodS);
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
