class Element{
  constructor(x,y,v){
    this.xPos=x;
    this.yPos=y;
    this.value=v; //value will define rendering order
                  //A higher value will be furthest back
                  //in element order
    this.show=false;
    allElements.push(this);
  }
  
  load(){
    if(activeElements.indexOf(this)==-1){
    this.show=true;
    var inserted=false;
    for(let i=0;i<activeElements.length;i++){
      if(!inserted&&activeElements[i].value<this.value){
        inserted=true;
        activeElements.splice(i,0,this);
      }
    }
    if(!inserted)
      activeElements.push(this);
    }
    else console.log("tried to load already loaded element");
  }
  
  unload(){
    this.show=false;
    if(activeElements.includes(this))
      activeElements.splice(activeElements.indexOf(this),1);
  }
  
  click(){}
}

class Box extends Element{
  constructor(x,y,xW,yW,v,c,dyn){
    super(x,y,v)
    this.w=xW;
    this.h=yW;
    this.color=c;
    this.dyn=dyn;
  }
  display(){
    if(this.dyn&&player.ownTurn)
      fill(cblue);
    else if(this.dyn&&!player.inGame)
      fill(cred);
    else fill(this.color);
    rect(this.xPos,this.yPos,this.w,this.h);
  }
}

class Circle extends Element{
  constructor(x,y,v,r,c){
    super(x,y,v);
    this.radius=r;
    this.color=c;
  }
  display(){
    fill(this.color);
    ellipseMode(CENTER);
    ellipse(this.xPos,this.yPos,this.radius,this.radius);
  }
}
class Static extends Element{
  constructor(x,y,xW,yW,v,ima){
    super(x,y,v);
    this.w=xW;
    this.h=yW;
    this.pict=ima;
  }
  display(){
    image(this.pict,this.xPos,this.yPos,this.w,this.h);
  }
}

class StaticText extends Element{
  constructor(x,y,v,h,ima,textC){
    super(x,y,v);
    this.h=h;
    this.itext=ima;
    this.textColor=textC
  }
  
  display(){
    if(this.h==tenth+1) textAlign(LEFT,TOP);
    textSize(tenth);
    textAlign(LEFT,TOP);
    fill(this.textColor);
    textSize(this.h);
    text(this.itext,this.xPos,this.yPos);
  }
}

class DynamicText extends Element{
  constructor(x,y,v,type){
    super(x,y,v);
    this.type=type;
  }
  display(){
    if(this.type==1){
      fill(0);
      textSize(tenth);
      textAlign(RIGHT,BOTTOM);
      text(player.peanuts+"₽",this.xPos,this.yPos);
    }
    if(this.type==2&&table.peanuts>0){
      fill(0);
      textSize(tenth);
      textAlign(CENTER,BOTTOM);
      text(table.peanuts+"₽",this.xPos,this.yPos);
    }
  }
}
class MessageText extends Element{
  constructor(){
    super(hhalf,tenth*1.5,1);
    this.message="null";
    this.colorInd=1;
    this.strength=100;
  }
  newMessage(mess,col,time){
    this.message=mess;
    this.colorInd=col;
    this.strength=time;
    this.load();
    //wait(time,unloadMessage);
  }
  display(){
    if(this.colorInd==1)
    fill(0,0,0,this.strength*20);
    if(this.colorInd==2)
    fill(200,10,10,this.strength*20);
    textSize(tenth*1.2);
    textAlign(CENTER,BOTTOM);
    text(this.message,this.xPos,this.yPos);
    if(this.strength==0)this.unload();
    this.strength--;
  }
}
function unloadMessage(){ prettyElements[3].unload()}
class Clickable extends Element{
  constructor(x,y,v,xW,yW,out,t){
    super(x,y,v);
    this.w=xW;
    this.h=yW;
    this.output=out;
    this.itext=t;
    this.clicked=false;
    clickables.push(this);
  }
 
  click(){
    if(this.show){
      if(mouseX>this.xPos&&mouseX<this.xPos+this.w&&
         mouseY>this.yPos&&mouseY<this.yPos+this.h){
        //this.output(); should instead be called in mouseR
        this.clicked=true;
        click=false;
      }
      else this.clicked=false;
    }
  }
  
  display(){
    fill(cred);
    rect(this.xPos,this.yPos,this.w,this.h);
    if(this.clicked) fill(255);
    else fill(0);
    textAlign(CENTER,CENTER);
    textSize((this.w*1.2)/this.itext.length);
    text(this.itext,this.xPos+(this.w/2),this.yPos+(this.h/2));
  }
}

class eleCard extends Element{
  constructor(x,y,v,card,scaler){
    super(x,y,v);
    if(card!=null){
      this.suit=card.name.substring(1,2);
      this.num=card.name.substring(0,1);
    }
    else{
      this.suit="N";
      this.num="U";
    }
    this.scaler=scaler;
    this.hidden=false;
    allCards.push(this);
  }
  update(card){
    this.suit=card.name.substring(1,2);
    this.num=card.name.substring(0,1);
  }
  reveal(){
    this.hidden=false;
  }
  hide(){
    this.hidden=true;
  }
  display(){
    if(!this.hidden){
      fill(225);
      rect(this.xPos,this.yPos,tenth*2*this.scaler,
           tenth*2.7*this.scaler,15*this.scaler);
      if(this.suit=="♠"||this.suit=="♣")
        fill(0);
      else fill(200,0,0);
      textAlign(LEFT,TOP);
      textSize(tenth*this.scaler);
      text(this.suit,this.xPos+tenth*0.1,this.yPos);
      textAlign(RIGHT,BOTTOM);
      textSize(tenth*2.3*this.scaler);
      text(this.num,this.xPos+tenth*1.9*this.scaler,
           this.yPos+tenth*3*this.scaler);
    }
    else{
      fill(0);
      rect(this.xPos,this.yPos,tenth*2*this.scaler,
           tenth*2.7*this.scaler,15*this.scaler);
    }
  }
  loadHidden(inputUpdate){
    this.update(inputUpdate);
    //this.hide();
    this.load();
  }
}

class eleMonkey extends Element{
  constructor(x,y,v,monk){
    if(windowHeight<=windowWidth*0.45)
       if(y>tenth*2)
         y+=tenth*0.4;
    super(x,y,v);
    this.moodArr=monk.folder;
    this.monkey=monk;
    this.mood=0;
    if(this.xPos<hhalf)
      this.onLeft=true;
  }
  update(newHubby){
    this.monkey=newHubby;
    this.moodArr=this.monkey.folder;
  }
  display(){
    if(this.onLeft)
      this.displayLeft();
    else this.displayRight();
  }
  displayLeft(){
    textSize(tenth*0.40);
    fill(0);
    textAlign(LEFT,BOTTOM);
    text(this.monkey.name,this.xPos,this.yPos);
    
    textSize(tenth*0.40);
    fill(0);
    textAlign(LEFT,TOP);
    text(this.monkey.peanuts+"₽",this.xPos,this.yPos+tenthH*1.2);
    
    if(!this.monkey.inGame)
      fill(cblue);
    else if(this.monkey.ownTurn)
      fill(cblue);
    else fill(0,0,0,80);
    rect(this.xPos,this.yPos,tenthH*1.2,tenthH*1.2);
    image(this.moodArr[this.mood],this.xPos,this.yPos,tenthH*1.2,tenthH*1.2);
    if(!this.monkey.inGame){
      fill(200,0,0,80);
      rect(this.xPos,this.yPos,tenthH*1.2,tenthH*1.2);
    }
  }
  displayRight(){
    textSize(tenth*0.40);
    fill(0);
    textAlign(RIGHT,BOTTOM);
    text(this.monkey.name,this.xPos,this.yPos);
    
    textSize(tenth*0.40);
    fill(0);
    textAlign(RIGHT,TOP);
    text(this.monkey.peanuts+"₽",
         this.xPos,this.yPos+tenthH*1.2);
    
    
    if(!this.monkey.inGame)
      fill(cblue);
    else if(this.monkey.ownTurn)
      fill(cblue);
    else fill(0,0,0,80);
    rect(this.xPos,this.yPos,-tenthH*1.2,tenthH*1.2);
    
    
    image(this.moodArr[this.mood],this.xPos,this.yPos,-tenthH*1.2,tenthH*1.2);
    if(!this.monkey.inGame){
      fill(200,0,0,80);
      rect(this.xPos,this.yPos,-tenthH*1.2,tenthH*1.2);
    }
  }
}

function loadStartScreen(){
  BGCI=0;
  menuElements[0].load();
  menuElements[1].load();
  
  prettyElements[4].load();
  prettyElements[5].load();
  prettyElements[6].load();
}

function loadGame(){
  BGCI=1;
  menuElements[0].unload();
  menuElements[1].unload();
  prettyElements[4].unload();
  prettyElements[5].unload();
  prettyElements[6].unload();
  gameStart();
}

function unloadAllElements(){
  for(let i=0;i<activeElements.length;i++)
    activeElements[i].unload();
  
}