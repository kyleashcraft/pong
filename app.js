var pong, ctx, player, computer, ball;

function initialize(){
  pong = document.getElementById("pong");
  ctx = pong.getContext("2d");
  player = new Paddle(10, pong.height/2 - 25, 0);
  computer = new Paddle(pong.width-20, pong.height/2 - 25, 0);
  ball = new Ball(pong.width/2, pong.height/2, -3, 3);
}

function Ball(x, y, xv, yv){
  this.xpos = x;
  this.ypos = y;
  this.xvel = xv;
  this.yvel = yv;
  this.rad = 10;
}

Ball.prototype.render = function(){
  ctx.beginPath();
  ctx.fillstyle = 'black';
  ctx.arc(this.xpos, this.ypos, this.rad, 0*Math.PI, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
}

Ball.prototype.move = function(){
  if ((ball.xpos - ball.rad <= player.xpos + player.width && ball.xpos + ball.rad >= player.xpos) && //ball hits right side of left (player) paddle AND
      (ball.ypos + ball.rad >= player.ypos && ball.ypos - ball.rad <= player.ypos + player.height) || //ball within y range of left (player) paddle OR
      (ball.xpos + ball.rad >= computer.xpos && ball.xpos - ball.rad <= computer.xpos + computer.width) && // ball hits left side of right (computer) paddle AND
      (ball.ypos + ball.rad >= computer.ypos && ball.ypos - ball.rad <= computer.ypos + computer.height) //ball within y range of right (computer) paddle
  ){
    ball.xvel *= -1; //then reverse x direction
  }
  if (ball.ypos - ball.rad <= 0 || ball.ypos + ball.rad >= pong.height){ //if top of ball hits top of canvas or bottom of ball htis bottom of canvas
    ball.yvel *= -1;
  }

  this.xpos += this.xvel;
  this.ypos += this.yvel;
}

function Paddle(x, y, v){
  this.xpos = x;
  this.ypos = y;
  this.vel = v;
  this.width = 10;
  this.height = 50;
  this.score = 0;
}

Paddle.prototype.render = function(){
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
}

Paddle.prototype.move = function(){
  this.ypos += this.vel;
  if (this.ypos < 0) {
    this.ypos = 0;
  } else if (this.ypos > pong.height - this.height) {
    this.ypos = pong.height - this.height;
  }
}

Paddle.prototype.update = function(){ //'AI segment', use only to move computer players.
  if (this.ypos + .5 * this.height > ball.ypos + ball.rad){
    this.vel = -2;
  } else if (this.ypos - .5 * this.height < ball.ypos - ball.rad){
    this.vel = 2;
  }
  this.ypos += this.vel;
}

window.addEventListener('keydown', (event) =>{
  if (event.key == "ArrowUp"){
    player.vel = -2;
  } else if (event.key == "ArrowDown"){
    player.vel = 2;
  }
});

window.addEventListener('keyup', () => {
  player.vel = 0;
})


function drawBoard(){
  ctx.beginPath();
  ctx.fillStyle = '#FFE0B5';
  ctx.fillRect(0, 0, pong.width, pong.height);
  ctx.fillStyle = 'white';
  ctx.font = "20px arial";
  ctx.fillText(player.score, .25 * pong.width, 25);
  ctx.fillText(computer.score, .75 * pong.width, 25);
}

var animate = window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) };

var step = function(){
  update();
  render();
  score();
  animate(step);
}

var update = function(){
  player.move();
  ball.move();
  computer.update();
}

var render = function(){
  pong.width = pong.width;
  drawBoard();
  player.render();
  computer.render();
  ball.render();
}

var score = function(){
  if (ball.xpos + ball.rad <= 0){
    computer.score++;
    restart();
  } else if (ball.xpos - ball.rad >= pong.width){
    player.score++;
    restart();
  }
}


function play() {
  initialize();
  drawBoard();
  animate(step);
}

function restart() {
    ball.xpos = pong.width/2;
    ball.ypos = pong.height/2;
    ball.xvel = -3;
    ball.yvel = 3;
}
