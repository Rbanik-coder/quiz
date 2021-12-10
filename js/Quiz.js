class Quiz {
  constructor(){}

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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    
    question.hide(); 

    background(bg);
    fill("white");
    textSize(30);
    text("Result of the Quiz",340, 50);
    text("----------------------------",320, 65);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      debugger;
      var display_Answers = 280;
      fill("white");
      textSize(22);
      //textFont("algerian");
      text("NOTE: Contestant who answered correct are highlighted in green color!",60,270);

      for(var plr in allContestants){
        debugger;
        var correctAns = "3";

         //if (correctAns !== allContestants[plr].answer){
         //  fill("Green")
         //}
         //else{
         // fill("red");
        // }

         if (correctAns === allContestants[plr].answer){
           stroke("white")
           strokeWeight(1)
          fill("green")
        }
        else{
          stroke("white")
          strokeWeight(1)
           fill("black");
        }

        // if (correctAns === allContestants[plr].answer){
        //   fill("red")
        // }
        // else{
        //   fill("green");
        // }

        // if (correctAns = allContestants[plr].answer){
        //   fill("Green")
        // }
        // else{
        //   fill("red");
        // }

        display_Answers+=30;
        textSize(25);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 260,display_Answers)
      }
    }
  }
}
