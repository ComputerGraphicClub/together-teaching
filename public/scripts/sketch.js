let clr;
let socket;
let scribble;
let drawingCanvas;
let drum;
let clap;
let asterisk;
let platform;
let GRAVITY = 2;
let JUMP = 20;
let bgColor = 0;
let stateDrum = 0;
let stateClap = 0;
function setup() {

	socket = io.connect('https://together-teaching.herokuapp.com/')
	//socket = io.connect('http://localhost:3000')
  socket.on('mouse', newDrawing);
	socket.on('mouse', newSound);
  createCanvas(windowWidth, windowHeight);
	drawingCanvas = createGraphics(windowWidth, windowHeight);
	drawingCanvas.clear();

	drum = loadSound('scripts/kick.mp3');
	clap = loadSound('scripts/hihat.mp3');

  background(bgColor);
	//frameRate(10);


  clr = random(360);
  //noStroke()

  pg = createGraphics(windowWidth, windowHeight);
  scribble = new Scribble();
	scribble.bowing    = 0.2;
	scribble.roughness = 2;

	// flower setup
	asterisk = createSprite(windowWidth/4, windowHeight/2);
  asterisk.addAnimation('normal', 'img/asterisk_normal0001.png', 'img/asterisk_normal0003.png');
  asterisk.addAnimation('stretch', 'img/asterisk_stretching0001.png', 'img/asterisk_stretching0008.png');
  asterisk.setCollider('circle', 0, 0, 64);

	asterisk2 = createSprite((windowWidth/4)*3, windowHeight/2);
  asterisk2.addAnimation('normal', 'img/asterisk_explode0008.png', 'img/asterisk_explode0011.png');
  asterisk2.addAnimation('stretch', 'img/asterisk_explode0001.png', 'img/asterisk_explode0007.png');
  asterisk2.setCollider('circle', 0, 0, 64);

  platform = createSprite(windowWidth/4, (windowHeight/2)+100);
  platform.addAnimation('normal', 'img/small_platform0001.png', 'img/small_platform0003.png');

	platform2 = createSprite((windowWidth/4)*3, (windowHeight/2)+100);
  platform2.addAnimation('normal', 'img/small_platform0001.png', 'img/small_platform0003.png');

}




function displayDot(x, y, color, color2 = 100){
	drawingCanvas.colorMode(HSB)
	drawingCanvas.fill(color, 100, color2)
	drawingCanvas.ellipse(x, y, 15)
	drawingCanvas.colorMode(RGB)
}

function playSoundReceived(stateDrum, stateClap){
	if (stateDrum === 1){
  drum.play();
	asterisk.changeAnimation('stretch');
	asterisk.animation.rewind();
	asterisk.velocity.y = -JUMP;
}

else if (stateClap === 1) {
	clap.play();
	asterisk2.changeAnimation('stretch');
	asterisk2.animation.rewind();
	asterisk2.velocity.y = -JUMP;
}

}



function draw() {
 //background('rgba(0,0,0, 0.95)');


 background(bgColor);


 image(drawingCanvas, 0, 0);

 stroke(255, 255, 204);
 strokeWeight(3);
 //noFill();
 var gap = 30;
 var angle = 315;

 randomSeed(10);
 scribble.scribbleLine( windowWidth/4, windowHeight/14, windowWidth*0.75, windowHeight/14);
 scribble.scribbleLine( windowWidth/4, windowHeight/6, windowWidth*0.75, windowHeight/6);

push();
 strokeWeight(1);
 scribble.scribbleLine( windowWidth/4, windowHeight/7, windowWidth*0.75, windowHeight/7);
 scribble.scribbleLine( windowWidth/4, windowHeight/8.5, windowWidth*0.75, windowHeight/8.5);
 scribble.scribbleLine( windowWidth/4, windowHeight/11, windowWidth*0.75, windowHeight/11);
pop();

 push();
 translate(-windowWidth/4, 0);
 scribble.scribbleRect( windowWidth/2, windowHeight/2, windowHeight/2, windowHeight/2);
stroke(0, 255, 255);

 scribble.scribbleFilling(
		 [
			 (windowWidth/2)-(windowHeight/4),
			 (windowWidth/2)+(windowHeight/4),
			 (windowWidth/2)+(windowHeight/4),
			 (windowWidth/2)-(windowHeight/4)
		 ],[
			 (windowHeight/2)-(windowHeight/4),
			 (windowHeight/2)-(windowHeight/4),
			 (windowHeight/2)+(windowHeight/4),
 			(windowHeight/2)+(windowHeight/4)
		 ],
		 gap, angle
	 );
	 pop();
	 push();
	 translate(windowWidth/4, 0);
	 scribble.scribbleRect( windowWidth/2, windowHeight/2, windowHeight/2, windowHeight/2);
	stroke(0, 180, 200);
	 scribble.scribbleFilling(
			 [
				 (windowWidth/2)-(windowHeight/4),
				 (windowWidth/2)+(windowHeight/4),
				 (windowWidth/2)+(windowHeight/4),
				 (windowWidth/2)-(windowHeight/4)
			 ],[
				 (windowHeight/2)-(windowHeight/4),
				 (windowHeight/2)-(windowHeight/4),
				 (windowHeight/2)+(windowHeight/4),
	 			(windowHeight/2)+(windowHeight/4)
			 ],
			 gap, angle
		 );

		 pop();

		 // Animation flower 1
		 asterisk.velocity.y += GRAVITY;

		 if(asterisk.collide(platform)) {
		 	asterisk.velocity.y = 0;
		 	asterisk.changeAnimation('normal');
		 }

		 // Animation flower 2
		asterisk2.velocity.y += GRAVITY;

		if(asterisk2.collide(platform2)) {
		 asterisk2.velocity.y = 0;
		 asterisk2.changeAnimation('normal');
		}


		 drawSprites();
		 playSound();

		   stateDrum = 0;
			 stateClap = 0;




}



function playSound() {
if (stateDrum === 1) {
	drum.play();
	asterisk.changeAnimation('stretch');
	asterisk.animation.rewind();
	asterisk.velocity.y = -JUMP;
	mouseDragged()
}

else if (stateClap === 1) {
	clap.play();
	asterisk2.changeAnimation('stretch');
	asterisk2.animation.rewind();
	asterisk2.velocity.y = -JUMP;
		mouseDragged()
}
else {}

}


function keyPressed() {
	if (keyCode === 65) {
    stateDrum = 1;

}

else if (keyCode === 90) {
	stateClap = 1;

}

	else {
stateDrum = 0;
stateClap = 0;
	}
}

function mousePressed(){
	mouseDragged()
}
function mouseDragged() {
	clr += 1
	clr = upgradeColor(clr)



	let data = {
		x: mouseX,
		y: mouseY,
		color: clr,
		Drum : stateDrum,
		Clap : stateClap
		//background : bgColor
	}
	socket.emit('mouse', data);
		console.log('sending:', mouseX +',', mouseY +',', clr +',', stateDrum +',', stateClap)
	drawingCanvas.noStroke()
	displayDot(mouseX, mouseY, clr)
}
function newDrawing(data){
	data.color = upgradeColor(data.color)
	displayDot(data.x, data.y, data.color, 90)
	//background(bgColor);
}

function newSound(data){
	playSoundReceived(data.Drum, data.Clap)
}

function upgradeColor(c){
	if (c < 0){
		c = 360 - c
	} else if(c > 360){
		c = c % 360
	}
	return c
}
