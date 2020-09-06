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
let bg;
let stateDrum = 0;
let stateClap = 0;

function setup() {

  bg = loadImage('img/bg_cardboard.jpg');
	//socket = io.connect('https://together-teaching.herokuapp.com/')
	socket = io.connect('http://localhost:3000')
  socket.on('mouse', newDrawing);
	socket.on('mouse', newSound);
  createCanvas(windowWidth, windowHeight);
	drawingCanvas = createGraphics(windowWidth, windowHeight);
	drawingCanvas.clear();

	drum = loadSound('scripts/kick.mp3');
	clap = loadSound('scripts/hihat.mp3');

  background(bgColor);
	//frameRate(10);


  //clr = random(360);
  clr = 50;
  //noStroke()

  pg = createGraphics(windowWidth, windowHeight);
  scribble = new Scribble();
	scribble.bowing    = 0.2;
	scribble.roughness = 2;

	// flower setup
	asterisk = createSprite(windowWidth/4, 0);
  asterisk.addAnimation('normal', 'img/asterisk_normal0001.png', 'img/asterisk_normal0003.png');
  asterisk.addAnimation('stretch', 'img/asterisk_stretching0001.png', 'img/asterisk_stretching0008.png');
  asterisk.setCollider('rectangle', 0, 0, 200, 128);

	asterisk2 = createSprite((windowWidth/4)*3, 0);
  asterisk2.addAnimation('normal', 'img/asterisk_explode0008.png', 'img/asterisk_explode0011.png');
  asterisk2.addAnimation('stretch', 'img/asterisk_explode0001.png', 'img/asterisk_explode0007.png');
  asterisk2.setCollider('rectangle', 0, 0, 200, 128);

  platform = createSprite(windowWidth/4, (windowHeight/2)+100);
  platform.addAnimation('normal', 'img/small_platform0001.png', 'img/small_platform0003.png');

	platform2 = createSprite((windowWidth/4)*3, (windowHeight/2)+100);
  platform2.addAnimation('normal', 'img/small_platform0001.png', 'img/small_platform0003.png');

  //Setup UI

  myButton_color_red = new Clickable();     //Create button
  myButton_color_green = new Clickable();     //Create button
  myButton_color_erase = new Clickable();     //Create Button
  myButton_color_black = new Clickable();     //Create button


  myButton_color_red.locate((windowWidth-80), 50);
  myButton_color_red.width = 30;
  myButton_color_red.height = 30;
  myButton_color_red.strokeWeight = 1;
  myButton_color_red.cornerRadius = 30;
  myButton_color_red.text = "";
  myButton_color_red.stroke = "#FEFFCD";
  myButton_color_red.color = "#FE2C02";   //Position Button
  myButton_color_red.onPress = function(){  //When myButton is pressed
    this.strokeWeight = 3;
    myButton_color_green.strokeWeight = 1;
    myButton_color_erase.strokeWeight = 1;
    myButton_color_black.strokeWeight = 1;    //Change button color
    //bg= 0;
    clr = 10;            //Show an alert message
  }

  myButton_color_green.locate((windowWidth-80), 90);
  myButton_color_green.width = 30;
  myButton_color_green.height = 30;
  myButton_color_green.strokeWeight = 1;
  myButton_color_green.cornerRadius = 30;
  myButton_color_green.text = "";
  myButton_color_green.stroke = "#FEFFCD";
  myButton_color_green.color = "#00FFBE";   //Position Button
  myButton_color_green.onPress = function(){  //When myButton is pressed
    this.strokeWeight = 3;
    myButton_color_red.strokeWeight = 1;
    myButton_color_erase.strokeWeight = 1;
    myButton_color_black.strokeWeight = 1;     //Change button color
    //bg= 0;
    clr = 165;            //Show an alert message
  }

  myButton_color_black.locate((windowWidth-80), 130);
  myButton_color_black.width = 30;
  myButton_color_black.height = 30;
  myButton_color_black.strokeWeight = 1;
  myButton_color_black.cornerRadius = 30;
  myButton_color_black.text = "";
  myButton_color_black.stroke = "#FEFFCD";
  myButton_color_black.color = "#000000";   //Position Button
  myButton_color_black.onPress = function(){  //When myButton is pressed
    this.strokeWeight = 3;
    myButton_color_red.strokeWeight = 1;
    myButton_color_green.strokeWeight = 1;
    myButton_color_erase.strokeWeight = 1;  //Change button color
    //bg= 0;
    clr = 190;            //Show an alert message
  }

  myButton_color_erase.locate((windowWidth-80), 170);
  myButton_color_erase.width = 30;
  myButton_color_erase.height = 30;
  myButton_color_erase.strokeWeight = 1;
  myButton_color_erase.cornerRadius = 30;
  myButton_color_erase.text = "";
  myButton_color_erase.stroke = "#FEFFCD";
  myButton_color_erase.color = "#B0864E";   //Position Button
  myButton_color_erase.onPress = function(){  //When myButton is pressed
    this.strokeWeight = 3;
    myButton_color_red.strokeWeight = 1;
    myButton_color_green.strokeWeight = 1;
    myButton_color_black.strokeWeight = 1;      //Change button color
    //bg= 0;
    clr = 240;            //Show an alert message
  }



}




function displayDot(x, y, color, color2 = 100){
	drawingCanvas.colorMode(HSB)
	drawingCanvas.fill(color, 100, color2)
	drawingCanvas.ellipse(x, y, 10)
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


 background(bg);


 image(drawingCanvas, 0, 0);

// UI

 myButton_color_red.draw();
 myButton_color_green.draw();
 myButton_color_black.draw();
 myButton_color_erase.draw();

 // Fin UI

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
    bg=0;
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
	// clr += 1
	// clr = upgradeColor(clr)
  //clr = 10;  //orange sanguine


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
	noStroke();
	data.color = upgradeColor(data.color);
	displayDot(data.x, data.y, data.color, 90);
	//background(bgColor);
}

function newSound(data){
	playSoundReceived(data.Drum, data.Clap);
}

function upgradeColor(c){
	if (c < 0){
		c = 360 - c
	} else if(c > 360){
		c = c % 360
	}
	return c
}
