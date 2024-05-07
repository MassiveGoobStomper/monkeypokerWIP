class Player{
  constructor(name){
    this.name=name;
    this.peanuts=0;
    this.hand=[];
    this.handWeight=0;
    this.wager=0;
    this.inGame=true;
    this.ownTurn=false;
    playersArr.splice(0,0,this);
  }
  
  hurt(amount){
    this.peanuts-=amount;
  }
  earn(amount){
    this.peanuts+=amount;
  }
  
  findWeight(){
    findWeight(this);
  }
  
  grabCard(name,ind){
    for(let i=0;i<deckCards.length;i++){
      if(deckCards[i].name==name){
        this.hand.splice(ind,1,deckCards[i]);
        deckCards.splice(i,1);
        console.log("added "+name+" to "+this);
        i=deckCards.length;
      }
    }
  }
  
  drawCard(){
    dealCard(this);
  }
  bet(amount){
    if(amount<=this.peanuts&&amount>=table.wager){
      rearrange(this);
      table.flag=0;
      table.peanuts+=amount;
      this.peanuts-=amount;
      table.wager+=amount;
      this.wager+=amount;
      table.pushFlag();
      prettyElements[3].newMessage(this.name+"  Bets "+amount,1,80);
    }
    else{
      this.check();
      }
  }
  check(){
    if(table.wager<=this.wager)
      wait(0.5,pushFlag);
    else if(this.peanuts>=(table.wager-this.wager)){
      this.hurt(table.wager-this.wager);
      table.earn(table.wager-this.wager);
      this.wager=table.wager;
      wait(0.5,pushFlag);
    }
    else{
      this.fold();
    }
    prettyElements[3].newMessage(this.name+" Checks",1,80);
  }
  fold(){
    this.inGame=false;
    wait(0.5,pushFlag);
    prettyElements[3].newMessage(this.name+" Folds",2,80);
  }
  runTurn(){}
  scream(){}
}

class Monkey extends Player{
  constructor(name,pictFolder,smarts,prec,scare,bald,rage,emo,blufer){
    super(name);
    monkeys[monkeyIndex]=this;
    monkeyIndex++;
    this.folder=pictFolder;
    this.sound=pictFolder[1];
    this.anger=0;
    this.understanding=0; //If positive the monkey
                          //thinks that it's cards
                          //are good from -100 to 100
    
    this.intel=smarts;   //Variation in understanding
    this.prec=prec;       //Chance to get mad over   
                          //cheating           
    this.scarey=scare ;   //Precent Chance of folding 
                          //if thinks cards bad
    this.bold=bald;       //Precent Chance to bet if 
                          //thinks cards good
    this.temper=rage;     //How much anger is gained
    this.emotional=emo;   //How much anger is lost when 
                          //winning
    this.bluff=blufer;    //Chance to make a pog face     
                          //despit bad cards

  }
  runTurn(){
    this.findUnderstanding();
    //from -100 to 100; closer to 100 
    //thinks cards are good and VV
    console.log(this.name+" understands... "+ this.understanding);
    if(this.understanding>615*this.bold){
      this.bet(5);
    }
    else if(this.understanding<-615*this.scarey){
         this.fold();
    }
    else this.check();
  }
  findUnderstanding(){
    findWeight(this);
    //hand weight is 3 to 815
    let base=this.handWeight;
    if(table.hand.length<3) base=this.handWeight*30;
     this.understanding=((base)*(0.5+Math.random()*this.intel));
    /*
    findWeight(player);
    findWeight(table);
    
    console.log("base: "+base);
    base=base-(table.handWeight)*0.1*table.peanuts+20;
    //fixthisshitfatboy();
    //base=base-player.handWeight;
   
    */
  }
  scream(){
    let r=Math.random();
    if(r>0.4)
      this.sound.play();
  }
}

class Table extends Player{
  constructor(name){
    super(name); //table.hand == middle Cards
             //table.peanuts == pot
    this.seat=[];
    this.flag=0;
    this.flagCount=0;
    this.miniPot=0;
  }
  sitDown(gamer){
    this.seat.push(gamer);
    console.log(gamer.name+" is sitting at seat "+this.seat.length);
  }
  payout(playerTo){
    playerTo.peanuts+=this.peanuts;
    this.peanuts=0;
  }
  pushFlag(){
    for(let i=0;i<table.seat.length;i++){
      table.seat[i].ownTurn=false;
    }
    
    this.flag++;
    if(table.flag>=5){
      this.flag=0;
      this.flagCount++;
      pushGame();
      rearrange(player);
    }
    
    table.seat[this.flag].ownTurn=true;
    
    
    if(!table.seat[this.flag].inGame)
      pushFlag();
    if(table.flag>0){
      console.log("doing");
      wait(0.5,boogerRun);
    }
  }
  
}

function gameStart(){
  table.seat=[];
  table.hand=[];
  table.sitDown(player);
  player.ownTurn=true;
  let tempMonk=[];
  for(let i=0;i<monkeys.length;i++){
    tempMonk.push(monkeys[i]);
  }
  
  for(let i=0;i<4;i++){
    let r=Math.floor(Math.random()*tempMonk.length);
    table.sitDown(tempMonk[r]);
    tempMonk.splice(r,1);
  }

  for(let i=0;i<table.seat.length;i++){
    table.seat[i].peanuts=50;
    table.seat[i].hand=[];
    table.seat[i].handWeight=0;
  }

  prettyElements[0].load();
  prettyElements[1].load();
  prettyElements[2].load();
  prettyElements[7].load();
  m1s.update(table.seat[1]);
  m1s.load();
  m2s.update(table.seat[2]);
  m2s.load();
  m3s.update(table.seat[3]);
  m3s.load();
  m4s.update(table.seat[4]);
  m4s.load();
  
  gameIndex=0;
  pushGame();
}
function findRank(){
  
}
function pushFlag(){table.pushFlag();}
function boogerRun(){
  table.seat[table.flag].scream();
  table.seat[table.flag].runTurn();
}

function rearrange(inputObject) {
  var index = table.seat.findIndex(obj => obj === inputObject); // Find the index of the input object

  if (index > -1) {
    const movedItems = table.seat.splice(0, index); // Remove objects before the input object
    table.seat.push(...movedItems); // Move the removed objects to the end of the array
  }
}
