var pong, ctx, player, computer, ball;

function initialize(){
  pong = document.getElementById("pong");
  ctx = pong.getContext("2d");
  player = new Paddle(10, pong.height/2, 0);
  computer = new Paddle(pong.width-20, pong.height/2, 0);
  ball = new Ball(pong.width/2, pong.height/2, 0, 0);
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

function Paddle(x, y, v){
  this.xpos = x;
  this.ypos = y;
  this.vel = v;
  this.width = 10;
  this.height = 50;
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
  animate(step);
}

var update = function(){
  player.move();
}

var render = function(){
  pong.width = pong.width;
  drawBoard();
  player.render();
  computer.render();
  ball.render();
}


function play() {
  initialize();
  drawBoard();
  animate(step);
}
