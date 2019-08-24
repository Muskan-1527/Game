function startGame() {
	myObstacles=[];
	myGameArea.start();
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

function component(width,height,color,x,y){
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.update = function(){
		ctx=myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}

function updateGameArea(){
	var y,lineWidth,gap,minWidth,maxWidth,x;
	myGameArea.clear();
	myGameArea.frameNo+=1;
	if(myGameArea.frameNo==1||everyinterval(150)) {
		y=myGameArea.canvas.height;
		x=myGameArea.canvas.width;
		minWidth=20;
		maxWidth=600;
		lineWidth=Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
        gap = 140;
		myObstacles.push(new component(lineWidth,10,"blue",0,y));
		myObstacles.push(new component((x-lineWidth-gap),10,"blue",(lineWidth+gap),y));
	}
	for(i=0;i<myObstacles.length; i+=1){
		myObstacles[i].y+=-1;
		myObstacles[i].update();
	}

}

function everyinterval(n){
	if(myGameArea.frameNo % n==0) {return true;}
	return false;
}