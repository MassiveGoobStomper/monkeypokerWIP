function makeAllCards(){
  let tempName="";
  let tempValue=2;
  let tempSuit=0;
  let index=0;
  var run=true;
  while(run){
    //♣♦♥♠
    tempName="";
    if(tempValue==14) tempName+="A";
    else if(tempValue==10) tempName+="X";
    else if(tempValue==11) tempName+="J";
    else if(tempValue==12) tempName+="Q";
    else if(tempValue==13) tempName+="K";
    else tempName+=tempValue;
    
    if(tempSuit==0) tempName+="♣";
    if(tempSuit==1) tempName+="♦";
    if(tempSuit==2) tempName+="♥";
    if(tempSuit==3) tempName+="♠";
    
    deckCards[index]=new Card(tempName,tempValue,tempSuit);
    index++;
    
    tempValue++;
    if(tempValue>14){
      tempSuit++;
      tempValue=2;
      if(tempSuit>3) run=false;
    }
  }
  logDeck();
}

function logDeck(){
  for(let i=0;i<deckCards.length;i++)
  console.log(deckCards[i].name + "   "+(1+i));
}

function shuffleDeck(){
  console.log("shuffling...");
  for(let i=0;i<playersArr.length;i++){
    for(let e=0;e<playersArr[i].hand.length;e++){
      deckCards.splice(0,0,(playersArr[i].hand[e]));
    }
  }

  player.hand=[];
  player.handWeight=0;
  table.hand=[];
  table.handWeight=0;
  monkeys.forEach(element=>hand=[]);
  monkeys.forEach(element=>handWeight=0);
  
  //logDeck();
}

function makeAllElements(){
  prettyElements[0]=new Box(0,vhalf+tenth*2.2,windowWidth,vhalf,101,cdgreen,true);
  prettyElements[1]=new DynamicText(tenthH*2,windowHeight-tenth,2,1);
  prettyElements[2]=new DynamicText(hhalf,vhalf,2,2);
  prettyElements[3]=new MessageText();
  pgCard1=new eleCard(hhalf-(tenth*1.2)-(tenth*1),vhalf+(tenth*2),1,player.hand[0],1);
  pgCard2=new eleCard(hhalf+(tenth*1.2)-(tenth*1),vhalf+(tenth*2),1,player.hand[1],1);
  prettyElements[4]=new Static(windowWidth-tenth*4,windowHeight-tenth*4,tenth*4,tenth*4,6,orangPicts[0]);
  prettyElements[5]=new Static(windowWidth-tenth*8,windowHeight-tenth*6,tenth*6,tenth*6,7,gorillaPicts[0]);
   prettyElements[6]=new Static(windowWidth-tenth*5,windowHeight-tenth*7,tenth*5,tenth*5,8,chimpPicts[0]);
 prettyElements[7]=new StaticText(windowWidth-tenth*2,windowHeight-tenth*2,1,1+tenth/2,"Q- Check \nW- Bet 5\nE- Fold",0);
    
  tgCard1=new eleCard(hhalf-(tenth*2)-(tenth*0.45),vhalf-(tenth*3),1,table.hand[0],0.45);
  tgCard2=new eleCard(hhalf-(tenth*1)-(tenth*0.45),vhalf-(tenth*3),1,table.hand[1],0.45);
  tgCard3=new eleCard(hhalf-(tenth*0.45),vhalf-(tenth*3),1,table.hand[2],0.45)
  tgCard4=new eleCard(hhalf+(tenth*1)-(tenth*0.45),vhalf-(tenth*3),1,table.hand[0],0.45)
  tgCard5=new eleCard(hhalf+(tenth*2)-(tenth*0.45),vhalf-(tenth*3),1,table.hand[2],0.45);
  
  m1s=new eleMonkey(tenth*0.3,tenth*0.5,10,orangPicts,table.seat[1]);
  m1Card1=new eleCard(m1s.xPos+tenth,m1s.yPos+tenth*1.9,1,table.hand[0],0.4);
  m1Card2=new eleCard(m1s.xPos+tenth*2,m1s.yPos+tenth*1.9,1,table.hand[1],0.4);
  
  m2s=new eleMonkey(tenth*0.3,vhalf-tenth*1.0,11,orangPicts,table.seat[2]);
  m2Card1=new eleCard(m2s.xPos+tenth,m2s.yPos+tenth*1.9,1,table.hand[0],0.4);
  m2Card2=new eleCard(m2s.xPos+tenth*2,m2s.yPos+tenth*1.9,1,table.hand[1],0.4);
  
  m3s=new eleMonkey(windowWidth-tenth*0.3,tenth*0.5,12,orangPicts,table.seat[3]);
  m3Card1=new eleCard(m3s.xPos-tenth-(tenth*2*0.4),m3s.yPos+tenth*1.9,1,table.hand[0],0.4);
  m3Card2=new eleCard(m3s.xPos-tenth*2-(tenth*2*0.4),m3s.yPos+tenth*1.9,1,table.hand[1],0.4);
  
  m4s=new eleMonkey(windowWidth-tenth*0.3,vhalf-tenth*1.0,13,orangPicts,table.seat[3]);
  m4Card1=new eleCard(m4s.xPos-tenth-(tenth*2*0.4),m4s.yPos+tenth*1.9,1,table.hand[0],0.4);
  m4Card2=new eleCard(m4s.xPos-tenth*2-(tenth*2*0.4),m4s.yPos+tenth*1.9,1,table.hand[1],0.4);
  
  menuElements[0]=new StaticText(tenthH/2,tenth,10,tenth*2,"MONKEY'S HAND",0);
  menuElements[1]=new Clickable(tenthH/2,vhalf,1,tenth*5,tenth,loadGame,"NEW GAME");
}

var table,player,macaque,gorilla,oranga,gibbon,chimp,cumpooch,mandrill,baboon;
var monkeys=[];
function makeAllGamers(){
  table=new Table("TABLE");
  player=new Player("PLAYER");
  
  //name,pictFolder,smarts,prec,
  //scare,bald,rage,emo,blufer
  chimp =new Monkey("CHIMPANZEE",chimpPicts,0.10,0.60,0.90,0.70,20,20,0.10);  //basic
  macaque =new Monkey("MACAQUE",macaquePicts,0,0.99,1,1,10,0,0);//straight foward; smart
  gorilla =new Monkey("GORILLA",gorillaPicts,0.30,0.30,0.40,0.90,43,32,0.20);  //dumb and agressive
  oranga =new Monkey("ORANGUTAN",orangPicts,0.05,0.89,0.80,0.60,16,42,0.8); //basic if docile and smart
  gibbon =new Monkey("GIBBON",gibbonPicts,0.13,0.70,0.98,0.07,8,3,0); //very docile and scared
  capuchin =new Monkey("MANDRILL",manPicts,0.20,0.69,0.32,0.90,12,34,0.60); //trickster
}
