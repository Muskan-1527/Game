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
	},
    
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
	var x,y;
	myGameArea.clear();
	myGameArea.frameNo +=1;
	if(myGameArea.frameNo==1||everyinterval(150)) {
		x=myGameArea.canvas.width-700;
		y=myGameArea.canvas.height;
		myObstacles.push(new component(400,10,"blue",x,y));
	}
	for(i=0;i<myObstacles.length; i+=1){
		myObstacles[i].y+=-1;
		myObstacles[i].update();
	}

}

function everyinterval(n){
	if((myGameArea.frameNo / n)%1==0) {return true;}
	return false;
}