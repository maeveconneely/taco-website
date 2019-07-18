var index = 0;
var score = 0;
var images = ["low.png", "high.png"];

function twerk() {
  index = index + 1;
  score++;
  document.getElementById("score").innerHTML = score;
  if (index == images.length) {
    index = 0;
  }
  var image1 = document.getElementById("taco");
  image1.src = images[index]
}



window.onload = function game_time() {

  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var rect_di = 50;
  var spike_di = 10;

  var up_pressed = false;
  var allow = false;
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  var x = canvas.width/2;
  var y = canvas.height-100;
  var dy = -50;



  var x_s = 0;
  var y_s = y;
  var dx = 10;


  var time = 0;
  var time_max = 30;

  function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        up_pressed = true;
    }

  }

  function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        up_pressed = false;
    }

  }

  function draw_spike () {
    ctx.beginPath();
    ctx.rect(x_s, y_s, spike_di, spike_di);
    ctx.fillStyle = "#587A00"
    ctx.fill()
  }

  function draw_ground () {
    ctx.beginPath();
    ctx.rect(0, y_s + rect_di, canvas.width, 30);
    ctx.fillStyle = "#FF5032"
    ctx.fill()
  }

  function draw_taco() {
    ctx.beginPath();
    ctx.rect(x, y, rect_di, rect_di); // first 2 value are coordinates
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }

  function game_over() {
    console.log("k")
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    x = canvas.width/2;
    y = canvas.height-100;

    x_s = 0;
    y_s = y;

    score = 0;
    document.getElementById("score").innerHTML = score;


    setTimeout(draw, 1000)
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_ground();
    draw_taco();
    draw_spike();

    if (time > 0 && allow == true) {
        time--;
        if (time == 0)
        {
          y -= dy
          allow = false;
        }
    }

    else if (up_pressed && allow == false) {
      if (time < time_max) {
        y += dy;
        time = time_max;
        allow = true;

      }
    }


    x_s += dx;
    // y += dy;
    if(y + dy > canvas.height - rect_di || y + dy < 0) {
    //   dy = -dy;
    }
     if(x_s + dx > canvas.width - spike_di || x_s + dx < 0) {
      dx = -dx;
    }

    if(x_s >= x && x_s <= x + rect_di &&
       y_s <= y)// && y_s >= y + rect_di)
       {
         game_over()
       }
}
 setInterval(draw, 10);

}
