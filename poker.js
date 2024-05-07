class Card{
  constructor(n,v,s){
    this.name=n;
    this.value=v;
    this.suit=s;
  }
}

function dealCard(who){
  if(deckCards.length<=0)
    console.log("Deck's Empty, need to reshuffle");
  else{
  let r=Math.floor(Math.random()*deckCards.length);
  who.hand.push(deckCards[r]);
  console.log(who.name+" drew: "+deckCards[r].name);
  deckCards.splice(r,1);
  }
}//can use this for table card 

function resetBoard(){
  table.hand=[];
  player.hand=[];
  for(let e=0;e<monkeys.length;e++){
    monkeys[e].hand=[];
  }
  deckCards=[];
  makeAllCards();
}

function findWeight(owner){
  //adds hand cards and table cards to an array
  tempArr=[];
  if(owner.hand.length>1){
  tempArr.push(owner.hand[0]);
  tempArr.push(owner.hand[1]);
  }
  for(let i=0;i<table.hand.length;i++){
    tempArr.push(table.hand[i]);
  }
  
  //sorts higest value first
  tempArr.sort((a,b)=>{return b.value-a.value;});
  
  owner.handWeight=findHighCard(tempArr);
  if(findPair(tempArr)>0) owner.handWeight=
    findPair(tempArr)+100;
  if(find2Pair(tempArr)>0) owner.handWeight=
    findPair(tempArr)+find2Pair(tempArr)+200;
  if(find3Kind(tempArr)>0) owner.handWeight=
    find3Kind(tempArr)+300;
  if(findStraight(tempArr)>0)owner.handWeight=
    findStraight(tempArr)+400;
  if(findFlush(tempArr)>0)owner.handWeight=
    findFlush(tempArr)+500;
  if(findHouse(tempArr)>0)owner.handWeight=
    findHouse(tempArr)+600;
  if(find4Kind(tempArr)>0)owner.handWeight=
    find4Kind(tempArr)+700;
  if(findSFlush(tempArr)>0)owner.handWeight=
    findSFlush(tempArr)+800;

  //for(let i=0;i<tempArr.length;i++) console.log("tempArr["+i+"]="+tempArr[i].name);
}

function findHighCard(arr){
  let high=0;
  for(let i=0;i<arr.length;i++){
    if(arr[i].value>high)
      high=arr[i].value;
  }
  return high;
}

function findPair(arr){
  for(let i=0;i<arr.length-1;i++){
    if(arr[i].value==arr[i+1].value)
      return arr[i].value;
  }  
  return 0;
}

function find2Pair(arr){
  let pair1=findPair(arr);
  for(let i=0;i<arr.length-1;i++){
    if(arr[i].value==arr[i+1].value&&
      arr[i].value!=pair1)
      return pair1;
  }
  return 0;
}

function find3Kind(arr){
  for(let i=0;i<arr.length-2;i++){
    if(arr[i].value==arr[i+1].value&&
      arr[i+1].value==arr[i+2].value)
      return arr[i].value;
  }
  return 0;
}

function findStraight(tempArr){
  var count=0;
  for(let i=tempArr.length-2;i>=0;i--){
   // console.log("i =" +tempArr[i].name);
    if(tempArr[i].value==tempArr[i+1].value+1)
      count++;
    else if(tempArr[i].value==tempArr[i+1].value) ;
    else
      count=0;
    if(count==4){
      return tempArr[i].value;
    }
  }
  return 0;
}

function findFlush(arr){
  for(let i=0;i<arr.length;i++)
  console.log("tempArr["+i+"]="+tempArr[i].name);
  
  let countC=0;
  let countD=0;
  let countH=0;
  let countS=0;
  for(let i=0;i<arr.length;i++){
    if(arr[i].suit==0)
      countC++;
    if(arr[i].suit==1)
      countD++;
    if(arr[i].suit==2)
      countH++;
    if(arr[i].suit==3)
      countS++;
  }
  if(countC>=5) return findHighCard(arr);
  if(countD>=5) return findHighCard(arr);
  if(countH>=5) return findHighCard(arr);
  if(countS>=5) return findHighCard(arr);
}

function findHouse(arr){
  let kind3=find3Kind(arr);
  for(let i=0;i<arr.length-1;i++){
    if(arr[i].value==arr[i+1].value&&
      arr[i].value!=kind3)
      return kind3;
  }
  return 0;
}

function find4Kind(arr){
  for(let i=0;i<arr.length-3;i++){
    if(arr[i].value==arr[i+1].value&&
       arr[i+2].value==arr[i+3].value&&
       arr[i].value==arr[i+3].value)
      return arr[i].value;
  } 
  return 0;
}

function findSFlush(arr){
  var count=0;
  for(let i=tempArr.length-2;i>=0;i--){
   // console.log("i =" +tempArr[i].name);
    if(tempArr[i].value==tempArr[i+1].value+1&&
      tempArr[i].suit==tempArr[i+1].suit)
      count++;
    else if(tempArr[i].value==tempArr[i+1].value&&
           tempArr[i].suit!=tempArr[i+1].suit) ;
    else
      count=0;
    if(count==4){
      return tempArr[i].value;
    }
  }
  return 0;
}

//==================================
//==================================

function dealHandCards(){
  //play dealing animation
  
   for(let i=0;i<table.seat.length;i++){
     dealCard(table.seat[i]);
     dealCard(table.seat[i]);
   }
   console.log(player.hand);
}

function tableCardsLog(){
  for(let i=0;i<table.hand.length;i++){
    console.log("table: "+table.hand[i].name);
  }
}

function pushGame(){
  gameIndex++;
  if(gameIndex==1) {
    dealHandCards();
    pgCard1.update(player.hand[0]);
    pgCard2.update(player.hand[1]);
    
    wait(1.3,showCards2);
    wait(1.1,showCards1);

  }
  if(gameIndex==2) {
    table.drawCard();
    table.drawCard();
    table.drawCard();
    
    soundArr[0].play();
    tgCard1.update(table.hand[0]);
    tgCard1.load();
    tgCard2.update(table.hand[1]);
    wait(0.2,flopAni1);
    tgCard3.update(table.hand[2]);
    wait(0.4,flopAni2);
  }
  if(gameIndex==3) {
    soundArr[0].play();
    table.drawCard();
    tgCard4.update(table.hand[3]);
    tgCard4.load();
  }
  if(gameIndex==4) {
    soundArr[0].play();
    table.drawCard();
    tgCard5.update(table.hand[4]);
    tgCard5.load();
  }
  if(gameIndex==5){
    soundArr[0].play();
    showHiddenCards();
    wait(0.5,pushGame);
  }
  if(gameIndex==6){
    winner=findWinner();
    prettyElements[3].newMessage(winner.name+" Won the pot",1,200);
    winner.earn(table.peanuts);
    table.hurt(table.peanuts);
    table.wager=0;
    wait(1,pushGame);
    
  }
  if(gameIndex>=7) {
    for(let i=0;i<allCards.length;i++){
      allCards[i].unload();
    }
    for(let i=0;i<table.seat.length;i++){
      table.seat[i].inGame=true;
    }
    
    //shuffleDeck(); same as resetBoard
    resetBoard();
    gameIndex=0;
    pushGame();
    tableCardsLog();
  }
}

function showCards1(){
  soundArr[0].play();
  pgCard1.load();
  m1Card1.loadHidden(table.seat[1].hand[0]);
  m2Card1.loadHidden(table.seat[2].hand[0]);
  m3Card1.loadHidden(table.seat[3].hand[0]);     
  m4Card1.loadHidden(table.seat[4].hand[0]);
}
function showCards2(){
  soundArr[0].play();
  pgCard2.load();
  m1Card2.loadHidden(table.seat[1].hand[1]);
  m2Card2.loadHidden(table.seat[2].hand[1]);
  m3Card2.loadHidden(table.seat[3].hand[1]);     
  m4Card2.loadHidden(table.seat[4].hand[1]);
}
function flopAni1(){
  tgCard2.load();
  soundArr[0].play();
}
function flopAni2(){
  tgCard3.load();
  soundArr[0].play();
}
function betStart(){}
function makeFunny(){
  booleanForBlueRug=true;
}
function showHiddenCards(){
  m1Card1.hidden=false;
  m1Card2.hidden=false;
  m2Card1.hidden=false;
  m2Card2.hidden=false;
  m3Card1.hidden=false;
  m3Card2.hidden=false;
  m4Card1.hidden=false;
  m4Card2.hidden=false;
}

function findWinner(){
  var tempHigh=0;
  for(let i=0;i<table.seat.length;i++){
    findWeight(table.seat[i]);
    if(table.seat[i].handWeight>tempHigh)
      tempHigh=table.seat[i];
  }
  return tempHigh;
}