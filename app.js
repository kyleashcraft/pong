var pong, ctx, player, computer, ball, newGame;
const scoreToWin = 11;

function initialize(){
  pong = document.getElementById("pong");
  ctx = pong.getContext("2d");
  player = new Paddle(10, pong.height/2 - 25, 0);
  computer = new Paddle(pong.width-20, pong.height/2 - 25, 0);
  ball = new Ball(pong.width/2, pong.height/2, -3, 3);
}

function Ball(x, y){
  this.vtot = 6;
  this.xpos = x;
  this.ypos = y;
  this.xvel = 2.5 + Math.random() * (this.vtot - 1);
  this.yvel = this.vtot - this.xvel;
  if (Math.random() >= .5) this.xvel *= -1;
  this.rad = 5;
}

Ball.prototype.serve = function(){
  this.xpos = pong.width / 2;
  this.ypos = pong.height / 2;
  this.xvel = 2.5 + Math.random() * (this.vtot - 1);
  this.yvel = this.vtot - this.xvel;
  if (Math.random() >= .5) this.xvel *= -1;
}

Ball.prototype.render = function(){
  ctx.beginPath();
  ctx.fillstyle = 'black';
  ctx.arc(this.xpos, this.ypos, this.rad, 0*Math.PI, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
}

Ball.prototype.move = function(){
  if ((ball.xpos <= player.xpos + player.width && ball.xpos >= player.xpos) && //ball hits right side of left (player) paddle AND
      (ball.ypos >= player.ypos && ball.ypos <= player.ypos + player.height) || //ball within y range of left (player) paddle OR
      (ball.xpos >= computer.xpos && ball.xpos <= computer.xpos + computer.width) && // ball hits left side of right (computer) paddle AND
      (ball.ypos >= computer.ypos && ball.ypos <= computer.ypos + computer.height) //ball within y range of right (computer) paddle
  ){
    ball.xvel *= -1; //then reverse x direction
    ball.xpos += 2*ball.xvel;
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
  this.width = 5;
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

Paddle.prototype.update = function(){ //'AI' motion, use only to move computer players.
  if (ball.ypos < this.ypos){
    this.vel = -2;
  } else if (ball.ypos > this.ypos + this.height){
    this.vel = 2;
  } else if (ball.ypos > this.ypos && ball.ypos < this.ypos + this.height && Math.abs(ball.yvel) <= 2 ){
    this.vel = ball.yvel;
  } else {
    this.vel = 2 * (ball.yvel / ball.yvel);
  }

  this.ypos += this.vel;
  if (this.ypos + this.height > pong.height) this.ypos = pong.height - this.height;
  if (this.ypos < 0) this.ypos = 0;


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
  player.score >= scoreToWin || computer.score >= scoreToWin ? gameEnd() : animate(step);
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
    ball.serve();
  } else if (ball.xpos - ball.rad >= pong.width){
    player.score++;
    ball.serve();
  }
}

var gameEnd = function(){
  ctx.beginPath();
  ctx.fillStyle = '#FFE0B5';
  ctx.fillRect(0, 0, pong.width, pong.height);
  ctx.fillStyle = 'white';
  ctx.font = "40px arial";
  player.score == scoreToWin ? ctx.fillText("You won!", 230, pong.height/2) : ctx.fillText("You lost!", 230, pong.height/2);
  ctx.font = "20px arial";
  ctx.fillText("Refresh page to play again", 190, pong.height/2 + 30)
}

function play() {
  initialize();
  drawBoard();
  animate(step);
}
