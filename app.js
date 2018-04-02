function drawBoard() {
  var pong = document.getElementById("pong");
  var ctx = pong.getContext("2d");
  var width = pong.width;
  var height = pong.height;

  ctx.fillStyle = '#FFE0B5';
  ctx.fillRect(0,0,pong.width,pong.height);
  ctx.fillStyle = "white";
  ctx.fillRect(10, height/2, 10, 50);
  ctx.fillRect(width-20, height/2, 10, 50);
  ctx.fillstyle = 'black';
  ctx.beginPath();
  ctx.arc(width/2, height/2, 10, 0*Math.PI, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.stroke();
  console.log("done drawing");
}
