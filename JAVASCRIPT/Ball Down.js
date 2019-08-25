
var myObstacles=[];
var widthStore=[];
var myGamePiece;
var k=0;
var myBackground;
function startGame() {
	myGamePiece = new ballComponent(95,50,40,0,2*Math.PI,"blue");
	myGameArea.start();
	myScore = new component("30px","Consolas","black",750,40,"text");
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
		alert("GameOver")
	}
    
}

function ballComponent(xCoordinate,yCoordinate,radius,startAngle,endAngle,color){

	this.xCoordinate = xCoordinate;
	this.yCoordinate = yCoordinate;
	this.radius = radius;
	this.startAngle = startAngle;
	this.endAngle = endAngle;
	this.speedX = 0;
	this.gravity = 6;
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
    	this.hitObstaclesLeft();
    	this.hitObstaclesRight();
    }

    	this.hitObstaclesLeft = function(){
		var rockObstacles = myObstacles[0].y;
		if(this.yCoordinate+this.radius>rockObstacles && this.yCoordinate+this.radius<rockObstacles + 10){
			if(this.xCoordinate<widthStore[0]+this.radius){
				this.yCoordinate=rockObstacles-this.radius;
			}
		}
        
	}

	this.hitObstaclesRight = function(){
		var rockObstacles = myObstacles[1].y;
		if(this.yCoordinate+this.radius>rockObstacles && this.yCoordinate+this.radius<rockObstacles + 10){
			if(this.xCoordinate>widthStore[0]+140){
				this.yCoordinate=rockObstacles-this.radius;
			}
		}
	}

     this.crashWith = function(){
     	if(this.yCoordinate+this.radius>myGameArea.canvas.height)
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

	myGamePiece.ballUpdate();
    myGamePiece.newPos();
	myScore.text = "SCORE:" + myGameArea.frameNo;
	myScore.update();
}



function everyinterval(n){
	if(myGameArea.frameNo % n==0) {return true;}
	return false;
}

function moveleft() {
    myGamePiece.speedX = -3; 
}

function moveright() {
    myGamePiece.speedX = 3; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
}