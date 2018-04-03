var pong;
var ctx;

function initialize(){
  pong = document.getElementById("pong");
  ctx = pong.getContext("2d");
}

function Ball(x, y, xv, yv){
  this.xpos = x;
  this.ypos = y;
  this.xvel = xv;
  this.yvel = yv;
}

Ball.prototype.render = function(){
  ctx.beginPath();
  ctx.fillstyle = 'black';
  ctx.arc(this.xpos, this.ypos, 10, 0*Math.PI, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
}

function Paddle(x, y, v){
  this.xpos = x;
  this.ypos = y;
  this.vel = v;
}

Paddle.prototype.render = function(){
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.fillRect(this.xpos, this.ypos, 10, 50);
}

function drawBoard(){
  ctx.beginPath();
  ctx.fillStyle = '#FFE0B5';
  ctx.fillRect(0, 0, pong.width, pong.height);
}


function play() {
  initialize();
  drawBoard();

  var player = new Paddle(10, pong.height/2, 0);
  var computer = new Paddle(pong.width-20, pong.height/2, 0);

  player.render();
  computer.render();

  var ball = new Ball(pong.width/2, pong.height/2, 0, 0);

  ball.render();
}
