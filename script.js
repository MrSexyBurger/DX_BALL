var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var pi = Math.PI;
var mouse = 0;
var start = false;
var win = 0;

var requestAnimationFrame = window.requestAnimationFrame||
							window.mozRequestAnimationFrame||
							window.webkitRequestAnimationFrame||
							window.msRequestAnimationFrame;

var player = {
	position: 300,
	lifes: 3,
	bonus: 0,
	score: 0,
	draw: function(){
		//центральный блок
		var lnr = ctx.createLinearGradient(0, 550, 0, 575);
		lnr.addColorStop(0.0, "#ededed");
		lnr.addColorStop(0.5, '#666666');
		lnr.addColorStop(1.0, "#ededed");
		ctx.beginPath();
		ctx.fillStyle = lnr;
		
		ctx.fillRect(this.position - 60, 550, 120, 24);
		ctx.fillStyle = 'black';
		ctx.fillRect(this.position - 57, 553, 114, 18);


		//левое ухо
		var grd = ctx.createRadialGradient(this.position - 58, 562, 0, this.position - 58, 562, 12);
		grd.addColorStop(0.0, "black");
		grd.addColorStop(1.0, "#ededed");


		ctx.beginPath();
		ctx.fillStyle = grd;
		ctx.arc(this.position - 62, 562, 12, 0.5*pi, pi*1.5, false);
		ctx.fill();


		//Правое ухо
		var grd = ctx.createRadialGradient(this.position + 58, 562, 0, this.position + 58, 562, 12);
		grd.addColorStop(0.0, "black");
		grd.addColorStop(1.0, "#ededed");


		ctx.beginPath();
		ctx.fillStyle = grd;
		ctx.arc(this.position + 62, 562, 12, 0.5*pi, pi*1.5, true);
		ctx.fill();
		
		//Надписи
		if (start == false) {
			ctx.beginPath();
			ctx.font = "10px Alfa Slab One";
			ctx.fillStyle = 'white';
			ctx.fillText('Press START', this.position-34, 566);
		}else{
			ctx.beginPath();
			ctx.font = "10px Alfa Slab One";
			ctx.fillStyle = 'white';
			ctx.fillText('DX-Ball', this.position-20, 566);
		};


	},
	update: function(){
		if (mouse > 72 && mouse < 528) {
		this.position = mouse;
		}
	},

	run: function(){
		this.update();
		this.draw();
	}

};

var ball = {
	speedX: -2,
	speedY: -5,
	positionX: 300,
	positionY: 300,
	draw: function(){
		ctx.beginPath();

		var grd = ctx.createRadialGradient(this.positionX, this.positionY, 1, this.positionX, this.positionY, 8);
		grd.addColorStop(0.0, "white");
		grd.addColorStop(0.1, "white");
		grd.addColorStop(1.0, "#666666");

		ctx.beginPath();
		ctx.fillStyle = grd;
		ctx.arc(this.positionX, this.positionY, 8, 0, 2*pi, true);
		ctx.fill();
	},
	update: function(){
		if(start == false){
			this.positionX = player.position;
			this.positionY = 540;
		}else{
			if(this.positionX < 4 || this.positionX > 596){
				this.speedX *= -1;
			}else if(this.positionY < 4){
				this.speedY *= -1;
			}else if(this.positionY > 540 && this.positionX > player.position - 80 && this.positionX < player.position + 80){
				this.speedY *= -1;
			}else if (this.positionY > 600) {
				player.lifes -= 1;
				start = false;
			}
			this.positionX += this.speedX;
			this.positionY += this.speedY;			
		}
	},
	run: function(){
		this.update();
		this.draw();
	}

}	


var block = {
	alive: true,
	constructor: function(posX, posY, sizeX, sizeY){
		this.positionX = posX;
		this.positionY = posY;
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		return this;
	},
	draw: function(){
		if(this.alive){
			var lnr = ctx.createLinearGradient(this.positionX, this.positionY, this.positionX, this.positionY + this.sizeY);
			lnr.addColorStop(0.0, "#828282");
			lnr.addColorStop(0.5, '#ededed');
			lnr.addColorStop(1.0, "#828282");
			ctx.beginPath();
			ctx.fillStyle = lnr;

			ctx.fillRect(this.positionX, this.positionY, this.sizeX, this.sizeY);
		}
	},
	update: function(){
		if (this.alive) {
			
			if (ball.positionX > this.positionX && ball.positionX < this.positionX + this.sizeX && ball.positionY == this.positionY) {
				ball.speedY *= -1;
				this.alive = false;
				player.score += 100;
				win +=1;
			}else if(ball.positionX > this.positionX && ball.positionX < this.positionX + this.sizeX && ball.positionY == this.positionY + this.sizeY){
				ball.speedY *= -1;
				this.alive = false;
				player.score += 100;
				win +=1;
			}else if(ball.positionY > this.positionY && ball.positionY < this.positionY + this.sizeY && ball.positionX == this.positionX){
				ball.speedX *= -1;
				this.alive = false;
				player.score += 100;
				win +=1;
			}else if(ball.positionY > this.positionY && ball.positionY < this.positionY + this.sizeY && ball.positionX == this.positionX + this.sizeX){
				ball.speedX *= -1;
				this.alive = false;
				player.score += 100;
				win +=1;
			}
		}
	},
	run: function(){
		this.update();
		this.draw();
	}
}

//первый ряд
var block1 = Object.create(block).constructor(50,100,50,25);
var block2 = Object.create(block).constructor(105,100,50,25);
var block3 = Object.create(block).constructor(160,100,50,25);
var block4 = Object.create(block).constructor(215,100,50,25);
var block5 = Object.create(block).constructor(270,100,50,25);
var block6 = Object.create(block).constructor(325,100,50,25);
var block7 = Object.create(block).constructor(380,100,50,25);
var block8 = Object.create(block).constructor(435,100,50,25);
var block9 = Object.create(block).constructor(490,100,50,25);

//второй ряд
var block10 = Object.create(block).constructor(50,130,50,25);
var block11 = Object.create(block).constructor(105,130,50,25);
var block12 = Object.create(block).constructor(160,130,50,25);
var block13 = Object.create(block).constructor(215,130,50,25);
var block14 = Object.create(block).constructor(270,130,50,25);
var block15 = Object.create(block).constructor(325,130,50,25);
var block16 = Object.create(block).constructor(380,130,50,25);
var block17 = Object.create(block).constructor(435,130,50,25);
var block18 = Object.create(block).constructor(490,130,50,25);

//третий ряд
var block19 = Object.create(block).constructor(50,160,50,25);
var block20 = Object.create(block).constructor(105,160,50,25);
var block21 = Object.create(block).constructor(160,160,50,25);
var block22 = Object.create(block).constructor(215,160,50,25);
var block23 = Object.create(block).constructor(270,160,50,25);
var block24 = Object.create(block).constructor(325,160,50,25);
var block25 = Object.create(block).constructor(380,160,50,25);
var block26 = Object.create(block).constructor(435,160,50,25);
var block27 = Object.create(block).constructor(490,160,50,25);



var blocks = [
	[block1, block2, block3, block4, block5, block6, block7, block8, block9],
	[block10, block11, block12, block13, block14, block15, block16, block17, block18],
	[block19, block20, block21, block22, block23, block24, block25, block26, block27]
];

function drawBlocks(){
	for (var i = 0; i < blocks.length; i++) {
		for(var j = 0; j < blocks[0].length; j++){
		blocks[i][j].run();
		}
	}
}


function drawBG (){
	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,600,600);
}


function drawScore(){
	ctx.beginPath();

	var lnr = ctx.createLinearGradient(0, 10, 0, 45);
	lnr.addColorStop(0.0, "black");
	lnr.addColorStop(0.5, 'white');
	lnr.addColorStop(1.0, "black");
	
	ctx.fillStyle = lnr;
	ctx.font = "30px Alfa Slab One";
	ctx.fillText('Score: ' + player.score, 20, 40);
}


function drawLifes(){
	ctx.beginPath();

	var lnr = ctx.createLinearGradient(0, 10, 0, 45);
	lnr.addColorStop(0.0, "black");
	lnr.addColorStop(0.5, 'white');
	lnr.addColorStop(1.0, "black");
	
	ctx.fillStyle = lnr;
	ctx.font = "30px Alfa Slab One";
	ctx.fillText('Lifes: ' + player.lifes, 475, 40);

}


function clearScreen(){
	ctx.clearRect(0,0,600,600);
}


function gameOver(){
	if(player.lifes == 0){
		alert('Game Over!');
		player.score = 0;
		player.lifes = 3;
	}
}

var toWin = blocks.length

function Win(){
	if(win == blocks.length*blocks[0].length){
		score = 0;
		win =  0;
		start = false;
		for (var i = 0; i < blocks.length; i++) {
			for(var j = 0; j < blocks[0].length; j++){
				blocks[i][j].alive = true;
			}
		}
		alert('You won!');
	}
}



function mainLoop(){
	clearScreen();
	
	drawBG();
	drawScore();
	drawLifes();
	
	player.run();

	ball.run();

	drawBlocks();

	gameOver();

	Win();

	requestAnimationFrame(mainLoop);
}


requestAnimationFrame(mainLoop);





canvas.onmousemove = function(event){
	mouse = event.offsetX;
}

canvas.onclick = function(event){
	start = true;
}

canvas.onmouseover = function(){
	document.body.style.cursor = 'none';
}