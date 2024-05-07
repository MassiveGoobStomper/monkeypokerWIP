class Event{
  constructor(when,what){
    this.when=when;
    this.what=what;
  }
}

function wait(sec,out){
  waitList[waitList.length]=new Event(timer+sec,out);
  console.log("wait "+sec+" bogo "+out);
}

function doTheDo(){
  for(let i=0;i<waitList.length;i++){
    if(waitList[i].when<=timer){
      waitList[i].what();
      waitList.splice(i,1);
    }
  }
}