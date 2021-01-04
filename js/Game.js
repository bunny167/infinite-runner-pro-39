class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    
  }

  play(){
  form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background("jungleImage");
      image(jungleImage,0,-displayHeight*4,displayWidth,displayHeight*5)
      //var display._position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the monkey
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the monkey a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the monkey in y direction
        y = displayHeight - allPlayers[plr].distance;
        monkey[index-1].x = x;
        monkey[index-1].y = y;

        if (index === player.index){
          monkey[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = monkey[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
if(player.distance>3860){
gameState =2; 
}
    drawSprites();
  }
  end(){
  console.log("Game Ended");
  }
}