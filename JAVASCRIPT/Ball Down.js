var myObstacles=[];
var widthStore=[];
var myGamePiece;
var k=0;
var myBackground;
var mySound;
var myMusic;
function startGame() {
	myGamePiece = new ballComponent(95,50,40,0,2*Math.PI,"blue");
	myGameArea.start();
	myScore = new component("30px","Consolas","black",750,40,"text");
	mySound = new sound("drop_message.mp3");
	myMusic = new sound("got_music_box_theme.mp3");
	myMusic.play();

}

var myGameArea = {
	canvas : document.createElement("canvas") ,
	start : function() {
		this.canvas.width = 960;
		this.canvas.height = 540;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	    this.frameNo=0;
	    this.interval=setInterval(updateGameArea, 20);
	},
	clear : function() {
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	},
		stop : function(){
		clearInterval(this.interval);
		alert("SCORE : "+myGameArea.frameNo+"\n  GAME OVER");
	}
    
}

function ballComponent(xCoordinate,yCoordinate,radius,startAngle,endAngle,color){

	this.xCoordinate = xCoordinate;
	this.yCoordinate = yCoordinate;
	this.radius = radius;
	this.startAngle = startAngle;
	this.endAngle = endAngle;
	this.speedX = 0;
	this.gravity = 4;
	this.ballUpdate = function(){
	bctx = myGameArea.context;
	bctx.beginPath();
	bctx.arc(this.xCoordinate,this.yCoordinate,this.radius,this.startAngle,this.endAngle);
	bctx.fillStyle = color ;
    bctx.stroke();
    }
    this.newPos = function(){
        this.yCoordinate +=this.gravity;
    	this.xCoordinate += this.speedX;
    	if(this.xCoordinate-this.radius<0){
    		this.xCoordinate=this.radius;
    	}
    	if(this.xCoordinate+this.radius>myGameArea.canvas.width){
    		this.xCoordinate=myGameArea.canvas.width-this.radius;
    	}

    }

    this.hitWithObstaclesLeft = function(otherobj){
    	var myleft = this.xCoordinate-(this.radius);
    	var mytop = this.yCoordinate-(this.radius);
    	var mybottom = this.yCoordinate + (this.radius);
    	var otherright = otherobj.x+(otherobj.width);
    	var othertop = otherobj.y;
    	var otherbottom = otherobj.y + (otherobj.height);
    	var crash = true;
    	if((mybottom < othertop) || (mybottom > otherbottom) || (myleft > otherright)) {
	       crash = false;
         }

         return crash;
    }

    this.hitWithObstaclesRight = function(otherobj){
        var myright = this.xCoordinate + (this.radius);
    	var mytop = this.yCoordinate-(this.radius);
    	var mybottom = this.yCoordinate + (this.radius);
    	var otherleft = otherobj.x;
    	var othertop = otherobj.y;
    	var otherbottom = otherobj.y + (otherobj.height);
    	var crash = true;
    	if((mybottom < othertop) || (mybottom > otherbottom) || (myright < otherleft)) {
	       crash = false;
         }

         return crash;
    }

     this.crashWith = function(){
     	if(this.yCoordinate-this.radius>myGameArea.canvas.height)
     		return true;
     	else if(this.yCoordinate+this.radius<0)
     		return true;

     }

}

function component(width,height,color,x,y,type){
	this.type = type;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.update = function(){
		ctx=myGameArea.context;
		if(this.type == "text"){
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		}else{
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);}
	}
}

function updateGameArea(){
	var y,lineWidth,gap,minWidth,maxWidth,x;
	if(myGamePiece.crashWith()){
		myGameArea.stop();
		mySound.play();
		myMusic.stop();
	}

    for(i = 0; i < myObstacles.length ; i += 1)
    {
    	if(i%2==0)
    	{
    		if(myGamePiece.hitWithObstaclesLeft(myObstacles[i])){
    		myGamePiece.yCoordinate = myObstacles[i].y-myGamePiece.radius;
    	   }
    	}

    	else
    	{
    		if(myGamePiece.hitWithObstaclesRight(myObstacles[i])){
    		myGamePiece.yCoordinate = myObstacles[i].y-myGamePiece.radius;
    	  }
    	}
    }
	
	myGameArea.clear();
	myGameArea.frameNo+=1;
	if(myGameArea.frameNo==1||everyinterval(150)) {
		y=myGameArea.canvas.height;
		x=myGameArea.canvas.width;
		minWidth=0;
		maxWidth=820;
		lineWidth=Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
		widthStore[k] = lineWidth;
		k=k+1;
        gap = 140;
		myObstacles.push(new component(lineWidth,10,"blue",0,y));
		myObstacles.push(new component((x-lineWidth-gap),10,"blue",(lineWidth+gap),y));
	}
	for(i=0;i<myObstacles.length; i+=1){
		myObstacles[i].y+=-1;
		myObstacles[i].update();
	}

	addEventListener('keyup', function (e) {
            myGameArea.key = false;
            myGamePiece.speedX=0;
        })
    addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })

	if (myGameArea.key && myGameArea.key == 37) {
		myGamePiece.speedX = -4; 
	}
    if (myGameArea.key && myGameArea.key == 39) {
    	myGamePiece.speedX = 4;
    }

	myGamePiece.ballUpdate();
    myGamePiece.newPos();
	myScore.text = "SCORE:" + myGameArea.frameNo;
	myScore.update();
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "none");
    this.sound.setAttribute("preload", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function everyinterval(n){
   	if(myGameArea.frameNo % n==0) {return true;}
	return false;
}