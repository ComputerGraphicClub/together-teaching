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
let webcam;
let imgBook;
let stateDrum = 0;
let stateClap = 0;

let scanLine;
let speed = 5;
let direction = 1;
let img_scan;
let img_scanX;
let img_scanY;
let img_galery;
let img_galeryX = 1;
let img_galeryY = 1;

let webcamX;
let webcamY;

let colorScanLine;

let textX;
let textY;

function setup() {

	// let div = createDiv('Selectionner un exercice');
	// div.addClass('exoSource');

	bg = loadImage('img/bg_cardboard.jpg');
  imgBook = loadImage('img/galerie.png');
	img_scan = loadImage('img/scan_img.png');
	img_galery = loadImage('img/galery_img2.png');

	img_scanY = windowHeight;
	img_scanX = windowWidth;

	webcamX = windowWidth*0.33;
	webcamY = 470;

	textX = windowWidth*0.51;
	textY = windowHeight-160;

	colorScanLine = 'rgba(235, 122, 166, 0.5)';

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


  clr = random(360);
  //noStroke()

  pg = createGraphics(windowWidth, windowHeight);
  scribble = new Scribble();
	scribble.bowing    = 0.2;
	scribble.roughness = 2;


	scanLine = height / 2;

	//Webcam//
	webcam = createCapture(VIDEO);
  webcam.size(windowWidth*0.3, windowHeight-(windowWidth*0.2));


	//Setup UI

	myButton_scan = new Clickable();     //Create button
	myButton_galery = new Clickable();     //Create button
	myButton_return = new Clickable();
	myButton_GoMusic = new Clickable();
	myButton_GoMath = new Clickable();
	myButton_GoEnglish = new Clickable();


    myButton_GoEnglish.locate(365, 70);
		myButton_GoEnglish.width = 180;
		myButton_GoEnglish.height = 450;
    myButton_GoEnglish.strokeWeight = 0;
		myButton_GoEnglish.text ="";
		myButton_GoEnglish.color = 'rgba(0,0,0, 0)';
		myButton_GoEnglish.onPress = function(){
		window.location.assign("playEnglish.html")
		}

		myButton_GoMath.locate(770, 200);
		myButton_GoMath.width = 160;
		myButton_GoMath.height = 180;
		myButton_GoMath.strokeWeight = 0;
		myButton_GoMath.text ="";
		myButton_GoMath.color = 'rgba(0,0,0, 0)';
		myButton_GoMath.onPress = function(){
		window.location.assign("playMath.html")
		}

		myButton_GoMusic.locate(610, 100);
		myButton_GoMusic.width = 150;
		myButton_GoMusic.height = 160;
		myButton_GoMusic.strokeWeight = 0;
		myButton_GoMusic.text ="";
		myButton_GoMusic.color = 'rgba(0,0,0, 0)';
		myButton_GoMusic.onPress = function(){
		window.location.assign("playRythm.html")
		}


		myButton_scan.locate((windowWidth/2)-35, (windowHeight-80));
  	myButton_scan.width = 30;
  	myButton_scan.height = 30;
  	myButton_scan.strokeWeight = 3;
  	myButton_scan.cornerRadius = 30;
  	myButton_scan.text = "";
  	myButton_scan.stroke = "#FEFFCD";
  	myButton_scan.color = "#8d6f47";   //Position Button
  	myButton_scan.onPress = function(){  //When myButton is pressed
    this.strokeWeight = 3;
		this.color = "#8d6f47";
		myButton_galery.color = "#c19e73";
    myButton_galery.strokeWeight = 1;
		img_galeryX = 1;
		img_galeryY = 1;
		img_scanX = windowWidth;
		img_scanY = windowHeight;
		colorScanLine = 'rgba(235, 122, 166, 0.5)';;
		webcamX = windowWidth*0.33;
		webcamY = 470;
		textX = windowWidth*0.51;
		textY = windowHeight-160;
  }

	myButton_galery.locate((windowWidth/2)+15, (windowHeight-80));
	myButton_galery.width = 30;
	myButton_galery.height = 30;
	myButton_galery.strokeWeight = 1;
	myButton_galery.cornerRadius = 30;
	myButton_galery.text = "";
	myButton_galery.stroke = "#FEFFCD";
	myButton_galery.color = "#c19e73";   //Position Button
	myButton_galery.onPress = function(){  //When myButton is pressed
	this.strokeWeight = 3;
	this.color = "#8d6f47";
	myButton_scan.strokeWeight = 1;
	myButton_scan.color = "#c19e73";
	img_galeryX = windowWidth;
	img_galeryY = windowHeight;
	img_scanX = 1;
	img_scanY =1;
	colorScanLine = 'rgba(0,250,154, 0)';
	webcamX = 1;
	webcamY = 1;
	textX = -400;
	textY = 0;
}

myButton_return.locate((windowWidth-60), 20);
myButton_return.width = 40;
myButton_return.height = 40;
myButton_return.strokeWeight = 0;
myButton_return.color = 'rgba(0,0,0, 0)';
myButton_return.text = "×";
myButton_return.textFont = "Comfortaa";
myButton_return.textSize = 45;
myButton_return.textColor = 'rgba(0,0,0, 0.15)';
myButton_return.onPress = function(){
window.location.assign("https://together-teaching.herokuapp.com/")
}

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




 background(bg);


 stroke(255, 255, 204);
 strokeWeight(3);







		 playSound();

		   stateDrum = 0;
			 stateClap = 0;

// Scan Book //
     push();
       fill('rgba(0, 0, 0, 0.5)');

			 image(drawingCanvas, 0, 0);
			 imgBook.resize(windowWidth*0.4, 0);
			 textFont("Comfortaa");
			 textSize(35);
			 textAlign(CENTER, CENTER);
			 noStroke();
			 fill(255, 255, 255);
       text('Scan your book', textX, textY);


pop();







// Webcam

push();
translate(windowWidth/2,0);
scale(-1.0,1.0);
image(webcam, -180, 60, webcamX, webcamY);
pop();



//scanner

			 push();
				stroke(colorScanLine);
			  strokeWeight(20);
			  line(width*0.35, scanLine, width*0.67, scanLine);
			 scanLine = scanLine - (speed*direction);
			 pop();
			 if (scanLine > (height-250)) {
			 	direction = 1;
			 }
			  if (scanLine < 0+(width*0.08)) {
			 	direction = -1;
			 }

	  image(img_scan, 0 , 0, img_scanX, img_scanY);
		image(img_galery, 0 , 0, img_galeryX, img_galeryY);

		myButton_scan.draw();
		myButton_galery.draw();
		myButton_return.draw();
		myButton_GoEnglish.draw();
		myButton_GoMath.draw();
		myButton_GoMusic.draw();
}

function clickBook() {
  background(255);
}

function playSound() {
if (stateDrum === 1) {

	mouseDragged()
}

else if (stateClap === 1) {

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
