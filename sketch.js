var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var date;
//create feed and lastFed variable here
var feed,lastFed,feedTime;
var hour;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  date = new Date()
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed the Dog");
  feed.position(680,95);
  feed.mousePressed(feedDog);

  feedTimeRef= database.ref("Feed Time")
  feedTimeRef.on("value", readTime, showError);

}

function readTime(data){
  lastFed = data.val(); 
}

function showError(error){
    console.log(error);
}

function draw() {
  background(46,139,87);
  
  hour=date.getHours();
  
  //write code to read fedtime value from the database 
 
  //write code to display text lastFed time here
  console.log(typeof(lastFed), lastFed>=12, "Value of lastFed:"+lastFed);
  if(lastFed>=12){
    console.log("Block1")
    text("lastFed: "+hour-12+" PM",350,30);
  }
  else if(lastFed==0){
    console.log("Block2")
    text("lastFed: 12 AM ",350,30);
  }
  else{
    console.log("Block3")
    stroke("black");
    text("lastFed: "+hour+" AM",900,95);
  }
  foodObj.display();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  
  foodS--;
  //write code here to update food stock and last fed time
  database.ref('/').update({
    Food:foodS
  })
  

 
 
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
