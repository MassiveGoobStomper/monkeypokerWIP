var mole1,mole2,mole3;
var cgreen="#32BC4C";
var cdgreen="#148916";
var cred="#E02939";
var cblue="#2946E0";
var cnugut="#CE8537";
var allElements=[];
var activeElements=[];
var deckCards=[];
var playersArr=[];
var click=false;
var prettyElements=[];
var monkeyIndex=0;
var gameIndex=0;
var tenth,tenthH,hhalf,vhalf,quarter;
var BGC=[cnugut,cgreen];
var BGCI=0;
var clickables=[];
var allCards=[];
var timer=0;
var waitList=[];
var booleanForBlueRug=false;
var winner;

//0 is lobby/main menu/prehand
//1=hands draw + big blind and little blinds bets
//2= first bet
//3 =is flop
//4 is second bet
//5 is turn
//6 is third bet
//7 is river
//8 is final bet

var pgCard1,pgCard2,tgCard1,tgCard2,tgCard3,tgCard4,tgCard5;
var m1Card1,m1Card2,m2Card1,m2Card2,m3Card1,m3Card2,m4Card1,m4Card2
var m1s,m2s,m3s,m4s;

var menuElements=[];
var soundArr=[];

var orangPicts=[];
var gorillaPicts=[];
var chimpPicts=[];
var gibbonPicts=[];
var manPicts=[];
var macaquePicts=[];
function preload(){
  orangPicts[0]=loadImage("monkey/orang/orang_norm.png");
  orangPicts[1]=loadSound("monkey/sounds/free-sound-1675114680.mp3");
  
  gorillaPicts[0]=loadImage("monkey/other_monks/gorilla_norm.png");
  gorillaPicts[1]=loadSound("monkey/sounds/free-sound-1675114673.mp3");
  
  chimpPicts[0]=loadImage("monkey/other_monks/chimp_norm.png");
  chimpPicts[1]=loadSound("monkey/sounds/chimpanzee-soundbible_an9DrBC.mp3");
  
  gibbonPicts[0]=loadImage("monkey/other_monks/gibbon_norm.png");
  gibbonPicts[1]=loadSound("monkey/sounds/free-sound-1675114687.mp3");
  
  manPicts[0]=loadImage("monkey/other_monks/man_norm.png");
  manPicts[1]=loadSound("monkey/sounds/mixkit-cartoon-creature-pain-scream-101.wav");
  
  macaquePicts[0]=loadImage("monkey/other_monks/macaque_norm.png");
  macaquePicts[1]=loadSound("monkey/sounds/monkey-128368.mp3");
  
  soundArr[0]=loadSound("monkey/sounds/flipcard-91468.mp3");
}


function setup() {
  bon=new Player();
  createCanvas(windowWidth, windowHeight);
  tenth=windowHeight/10;
  tenthH=windowWidth/10
  hhalf=windowWidth/2;
  vhalf=windowHeight/2;
  third=windowWidth/3;
  strokeWeight(0);
  makeAllCards();
  makeAllGamers();
  makeAllElements();
  
  loadStartScreen();
  
  winner=player;
}

function testout(){
  console.log("booger");
}
function mousePressed(){
  click=true;
  for(let i=0;i<clickables.length;i++){
    clickables[i].click();
  }
}

function mouseReleased(){
  click=false;
  for(let i=0;i<clickables.length;i++){
    if(clickables[i].clicked)
      clickables[i].output();
    clickables[i].clicked=false;
  }
}

function keyPressed() {
  if(player.ownTurn&&gameIndex<6){
    if(key == "q") {
      player.check();
    }
    if(key=="w"){
      player.bet(5);
    }
    if(key=="e"){
      player.fold();
    }
  }
  if(key=="s"){
    shuffleDeck();
    gameIndex=0;
  }
  
  if(key=="d"){ //♣♦♥♠
    console.log(player.ownTurn);
    /*
    table.grabCard("9♣");
    table.grabCard("8♣");
    table.grabCard("7♣");
    table.grabCard("6♣");
    table.grabCard("5♣");
    */
  }
  
  if(key=="1"){
    gameStart();
  }
  if(key=="2"){
    pushGame();
  }
  if(key=="8"){
    player.grabCard("X♣",0);
    pgCard1.update(player.hand[0]);
  }
  if(key=="9"){
    prettyElements[3].newMessage("something funny",1,100);

  }
  if(key=="0"){
    //wait(6,testOut);
    soundArr[0].play();
  }
}

function testOut(){
  console.log("big fricken boogy "+ frameCount)
}

function draw() {
  background(BGC[BGCI]);
  for(let i=0;i<activeElements.length;i++){
    activeElements[i].display();
  }
  
  if(frameCount%6==0&&timer>=0)
    timer+=0.1;
  
  doTheDo();
  textSize(tenth/2);
  //text("FLAG "+ table.flag,500,50);
  //text("BOOL "+ player.ownTurn,500,100);
  
  //if(player.peanuts>0&&player.peanuts!=-69) gameOver();
}

function gameOver(){
  player.peanuts=-69;
  prettyElements[3].newMessage("YOU LOSE",2,5);
  //wait(3,bum());
}
