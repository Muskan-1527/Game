function startGame() {
	myGameArea.start();
}

var myGameArea = {
	canvas : document.createElement("canvas") ,
	start : function() {
		this.canvas.width = 960;
		this.canvas.height = 540;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	}
}