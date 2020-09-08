let clrR;
let clrG;
let clrB;
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

let iconSun;
let iconMoon;
let iconCamera;
let iconPrint;
let iconExit;
let alphaJauge = 0;

function setup() {

  bg = loadImage('img/bg_cardboard.jpg');
  socket = io.connect('https://together-teaching.herokuapp.com/')
	//socket = io.connect('http://localhost:3000')
  socket.on('mouse', newDrawing);
	socket.on('mouse', newSound);
  createCanvas(windowWidth, windowHeight);
	drawingCanvas = createGraphics(windowWidth, windowHeight);
	drawingCanvas.clear();

	drum = loadSound('scripts/kick.mp3');
	clap = loadSound('scripts/hihat.mp3');
  iconSun = loadImage('img/icon_sun.png'); // Load the image
  iconMoon = loadImage('img/icon_moon.png'); // Load the image
  iconCamera = loadImage('img/icon_camera.png'); // Load the image
  iconPrint = loadImage('img/icon_print.png'); // Load the image
  iconExit = loadImage('img/icon_exit.png'); // Load the image

  background(bgColor);
	//frameRate(10);


  //clr = random(360);
  clrR = 231;
  clrG = 191;
  clrB = 18;
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
  myButton_color_icon_sun = new Clickable();     //Create button
  myButton_color_icon_moon = new Clickable();     //Create button
  myButton_color_icon_print = new Clickable();     //Create button

  myButton_color_icon_print.locate((windowWidth-215), (windowHeight-75));
  myButton_color_icon_print.width = 35;
  myButton_color_icon_print.height = 35;
  myButton_color_icon_print.strokeWeight = 1;
  myButton_color_icon_print.cornerRadius = 30;
  myButton_color_icon_print.text = "";
  myButton_color_icon_print.stroke = "#FEFFCD";
  myButton_color_icon_print.color = "#B0864E";   //Position Button
  myButton_color_icon_print.onPress = function(){  //When myButton is pressed
  window.location.assign("https://together-teaching.herokuapp.com/play.html")
  }


  myButton_color_red.locate((windowWidth-83), (windowHeight-80));
  myButton_color_red.width = 40;
  myButton_color_red.height = 40;
  myButton_color_red.strokeWeight = 1;
  myButton_color_red.cornerRadius = 30;
  myButton_color_red.text = "";
  myButton_color_red.stroke = "#FEFFCD";
  myButton_color_red.color = "#EB7AA6";   //Position Button
  myButton_color_red.onPress = function(){  //When myButton is pressed
    this.strokeWeight = 3;
    myButton_color_green.strokeWeight = 1;
    myButton_color_erase.strokeWeight = 1;
    myButton_color_black.strokeWeight = 1;    //Change button color
    //bg= 0;

    clrR = 235;
    clrG = 122;
    clrB = 166;       //Show an alert message
  }

  myButton_color_green.locate((windowWidth-120), (windowHeight-80));
  myButton_color_green.width = 40;
  myButton_color_green.height = 40;
  myButton_color_green.strokeWeight = 1;
  myButton_color_green.cornerRadius = 30;
  myButton_color_green.text = "";
  myButton_color_green.stroke = "#FEFFCD";
  myButton_color_green.color = "#00FFFF";   //Position Button
  myButton_color_green.onPress = function(){  //When myButton is pressed
    this.strokeWeight = 3;
    myButton_color_red.strokeWeight = 1;
    myButton_color_erase.strokeWeight = 1;
    myButton_color_black.strokeWeight = 1;     //Change button color
    //bg= 0;
    clrR = 0;
    clrG = 255;
    clrB = 255;           //Show an alert message
  }

  myButton_color_black.locate((windowWidth-100), (windowHeight-110));
  myButton_color_black.width = 40;
  myButton_color_black.height = 40;
  myButton_color_black.strokeWeight = 1;
  myButton_color_black.cornerRadius = 30;
  myButton_color_black.text = "";
  myButton_color_black.stroke = "#FEFFCD";
  myButton_color_black.color = "#E7BF12";   //Position Button
  myButton_color_black.onPress = function(){  //When myButton is pressed
    this.strokeWeight = 3;
    myButton_color_red.strokeWeight = 1;
    myButton_color_green.strokeWeight = 1;
    myButton_color_erase.strokeWeight = 1;  //Change button color
    //bg= 0;
    clrR = 231;
    clrG = 191;
    clrB = 18;              //Show an alert message
  }

  myButton_color_erase.locate((windowWidth-195), (windowHeight-110));
  myButton_color_erase.width = 35;
  myButton_color_erase.height = 35;
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
    document.location.reload(true);            //Show an alert message
  }

  myButton_color_icon_sun.locate((windowWidth-175), (windowHeight-75));
  myButton_color_icon_sun.width = 35;
  myButton_color_icon_sun.height = 35;
  myButton_color_icon_sun.strokeWeight = 1;
  myButton_color_icon_sun.cornerRadius = 30;
  myButton_color_icon_sun.text = "";
  myButton_color_icon_sun.stroke = "#FEFFCD";
  myButton_color_icon_sun.color = "#B0864E";
  myButton_color_icon_sun.onPress = function(){  //When myButton is pressed
    this.strokeWeight = 3;
    myButton_color_icon_moon.strokeWeight = 1;
    this.color = "#000000";
    myButton_color_icon_moon.color = "#000000";
    myButton_color_erase.color = "#000000";
    myButton_color_icon_print.color = "#000000";
    bg=0;
    iconSun = loadImage('img/icon_moon.png');
          //Show an alert message
  }

  myButton_color_icon_moon.locate((windowWidth-155), (windowHeight-110));
  myButton_color_icon_moon.width = 35;
  myButton_color_icon_moon.height = 35;
  myButton_color_icon_moon.strokeWeight = 1;
  myButton_color_icon_moon.cornerRadius = 30;
  myButton_color_icon_moon.text = "";
  myButton_color_icon_moon.stroke = "#FEFFCD";
  myButton_color_icon_moon.color = "#B0864E";
  myButton_color_icon_moon.onPress = function(){  //When myButton is pressed
    this.strokeWeight = 3;
    this.color = "#B0864E";
    myButton_color_icon_sun.strokeWeight = 1;
    myButton_color_icon_sun.color = "#B0864E";
    myButton_color_erase.color = "#B0864E";
    myButton_color_icon_print.color = "#B0864E";
    bg = loadImage('img/bg_cardboard.jpg');

          //Show an alert message
  }



}




function displayDot(x, y, colorR, colorG, colorB){
	//drawingCanvas.colorMode(HSB)
  drawingCanvas.noStroke();
	drawingCanvas.fill(colorR, colorG, colorB)
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
push();
  //scale(1.3);
  //translate(-250, -150);
 myButton_color_red.draw();
 myButton_color_green.draw();
 myButton_color_black.draw();
 myButton_color_erase.draw();
 myButton_color_icon_sun.draw();
 myButton_color_icon_moon.draw();
 myButton_color_icon_print.draw();

   image(iconSun, (windowWidth-169.5), (windowHeight-70), 25, 25);
   image(iconCamera, (windowWidth-149), (windowHeight-105), 25, 25);
   image(iconExit, (windowWidth-210), (windowHeight-70), 25, 25);
   image(iconPrint, (windowWidth-189.5), (windowHeight-105), 25, 25);
pop();
 // Fin UI

 stroke(255, 255, 204);
 strokeWeight(2);
 //noFill();
 var gap = 30;
 var angle = 315;

 randomSeed(10);
 scribble.scribbleLine( windowWidth/4, windowHeight/14, windowWidth*0.75, windowHeight/14);
 scribble.scribbleLine( windowWidth/4, windowHeight/6, windowWidth*0.75, windowHeight/6);

//jauge reussite
push();
stroke('rgba(255, 255, 204,' + alphaJauge + ')');
scribble.scribbleRect( 410, windowHeight-80, 700, 70);
stroke('rgba(231, 191, 18,' + alphaJauge + ')');
 strokeWeight(1);

 scribble.scribbleFilling(
		 [
			 70,
			 640,
			 640,
			 70
		 ],[
			 720,
			 720,
			 655,
 			655
		 ],
		 30, angle
	 );
pop();

push();
 strokeWeight(0.5);
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

}

else if (keyCode === 90) {
	stateClap = 1;

}

else if (keyCode === 74) {
  alphaJauge = 0;
}

else if (keyCode === 72) {
  alphaJauge = 1;
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
		colorR: clrR,
    colorG: clrG,
    colorB: clrB,
		Drum : stateDrum,
		Clap : stateClap
		//background : bgColor
	}
	socket.emit('mouse', data);
  console.log('sending:', mouseX +',', mouseY +',', clrR +',', clrG +',', clrB +',', stateDrum +',', stateClap)
	drawingCanvas.noStroke()
		displayDot(mouseX, mouseY, clrR, clrG, clrB)
}
function newDrawing(data){
	noStroke();
	data.color = upgradeColor(data.color);
	displayDot(data.x, data.y, data.colorR, data.colorG, data.colorB);
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
