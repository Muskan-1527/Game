var myObstacles=[];
var myGamePiece;
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
	}
    
}

function ballComponent(xCoordinate,yCoordinate,radius,startAngle,endAngle,color){

	this.xCoordinate = xCoordinate;
	this.yCoordinate = yCoordinate;
	this.radius = radius;
	this.startAngle = startAngle;
	this.endAngle = endAngle;
	this.speedX = 0;
	this.ballUpdate = function(){
	bctx = myGameArea.context;
	bctx.beginPath();
	bctx.arc(this.xCoordinate,this.yCoordinate,this.radius,this.startAngle,this.endAngle);
	bctx.fillStyle = color ;
    bctx.stroke();
    }
    this.newPos = function(){
    	this.xCoordinate += this.speedX;
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
	myGameArea.clear();
	myGameArea.frameNo+=1;
	if(myGameArea.frameNo==1||everyinterval(150)) {
		y=myGameArea.canvas.height;
		x=myGameArea.canvas.width;
		minWidth=0;
		maxWidth=820;
		lineWidth=Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
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
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
}
