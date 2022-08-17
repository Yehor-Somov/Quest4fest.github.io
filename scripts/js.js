let variant = Math.floor(Math.random() * 5 + 1);

let isValid = true;

let gridStep;

let startButton = document.querySelector("#startButton");

let w;
if (window.innerWidth > 800) {
  w = window.innerWidth / 2.4 + 40;
  document.querySelector(".userArea").style.width = w + "px";
}

let userWay = [];
let userWays = [];

let rightWay = true;

let img;

let playerX;
let playerY;

let i = 0;

let timer;

// state == 1 - ожидание команд
// state == 2 - отрисовка проезда
// state == 3 - неудача, перезапуск
// state == 4 - удача, перезапуск
let state = 1;

let startPointX;
let startPointY;

let checkIndex = 0;

function preload() {
  game_map = loadImage(`images/maps/${variant}.svg`);
  Inter = loadFont("fonts/Inter.ttf");
  imgRight = loadImage("images/Quant/Quant-Right.png");
  imgLeft = loadImage("images/Quant/Quant-Left.png");
  imgDown = loadImage("images/Quant/Quant-Down.png");
  imgUp = loadImage("images/Quant/Quant-Up.png");
  img = imgRight;
}

function setup() {
  if (innerWidth > 800) {
    createCanvas(window.innerWidth / 2.4, window.innerWidth / 2.4);
  } else {
    createCanvas(window.innerWidth / 1.2, window.innerWidth / 1.2);
  }

  imageMode(CENTER);
  img.resize(width / 15, width / 15);
  game_map.resize(width, 0);

  gridStep = width / 20;

  startPointX = gridStep * 1;
  startPointY = gridStep * 3;

  playerX = startPointX;
  playerY = startPointY;

  timer = millis();
}

function draw() {
  if (state == 1) {
    background(220);
    image(game_map, width / 2, height / 2);
    grid();
    img.resize(width / 15, width / 15);
    image(img, playerX, playerY);
    gridStep = width / 20;
  } else if (state == 2) {
    background(220);
    image(game_map, width / 2, height / 2);
    grid();
    img.resize(width / 15, width / 15);
    image(img, playerX, playerY);
    gridStep = width / 20;

    if (userWays[0][i] == "turnDown") {
      img = imgDown;
      checkRightWay();
    } else if (userWays[0][i] == "turnUp") {
      img = imgUp;
      checkRightWay();
    } else if (userWays[0][i] == "turnRight") {
      img = imgRight;
      checkRightWay();
    } else if (userWays[0][i] == "turnLeft") {
      img = imgLeft;
      checkRightWay();
    } else {
      playerX = +userWays[0][i];
      playerY = +userWays[1][i];
    }
    i++;

    if (i > userWays[0].length) {
      if (!rightWay) {
        isValid = false;
        state = 3;
      } else {
        isValid = false;
        state = 4;
        setTimeout(() => {
          document.location.href = "https://robocode.ua/fest-ua";
        }, 3000);
      }
    }
  } else if (state == 3) {
    background(220);
    image(game_map, width / 2, height / 2);
    grid();
    img.resize(width / 15, width / 15);
    image(img, playerX, playerY);
    gridStep = width / 20;
    noStroke();
    fill("rgba(0,0,0, 0.7)");
    rect(0, 0, width, height);
    textSize(32);
    textFont(Inter);
    textAlign(CENTER);
    fill("rgb(255,255,255)");
    text("Щось пішло не так :(", width / 2, height / 2 - 120);
    text("Спробуєш ще раз?", width / 2, height / 2 - 60);
    rect(width / 2 - 100, height / 2 - 25, 200, 50, 20);

    textSize(24);
    fill("rgb(0,0,0)");
    text("RESET", width / 2, height / 2 + 8);

    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 - 100 + 200 &&
      mouseY > height / 2 - 25 &&
      mouseY < height / 2 - 25 + 50
    ) {
      document.querySelector("canvas").style.cursor = "pointer";
    } else document.querySelector("canvas").style.cursor = "default";

    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 - 100 + 200 &&
      mouseY > height / 2 - 25 &&
      mouseY < height / 2 - 25 + 50 &&
      mouseIsPressed
    ) {
      reset();
    }
  } else if (state == 4) {
    background(220);
    image(game_map, width / 2, height / 2);
    img.resize(width / 15, width / 15);
    image(img, playerX, playerY);
    gridStep = width / 20;
    noStroke();
    fill("rgba(0, 0, 0, 0.7)");
    rect(0, 0, width, height);
    textSize(32);
    textFont(Inter);
    textAlign(CENTER);
    fill("rgb(255,255,255)");
    text("Молодець, ти впорався!", width / 2, height / 2 - 150);

    textSize(20);
    text("А тепер дивись, що відбудеться :)", width / 2, height / 2 - 80);
  }
}

function reset() {
  isValid = true;
  state = 1;
  img = loadImage("images/Quant/Quant-Right.png");
  playerX = startPointX;
  playerY = startPointY;
  userWay = [];
  i = 0;
  checkIndex = 0;
  rightWay = true;
}

function grid() {
  stroke(170);
  strokeWeight(1);
  for (let i = 0; i <= width; i += gridStep) {
    line(i, 0, i, height);
  }
  for (let i = 0; i <= height; i += gridStep) {
    line(0, i, width, i);
  }
}

function checkRightWay() {
  if (userWay[checkIndex] === mainWay[variant - 1][checkIndex]) {
    checkIndex += 2;
  } else {
    state = 3;
  }
}

function userWayToPath(startX, startY, userWayOut) {
  let pathX = [];
  let pathY = [];
  let dirX = 1;
  let dirY = 0;
  let addedX = startX;
  let addedY = startY;

  for (let i = 0; i < userWayOut.length; i++) {
    let command = userWayOut[i].split(" ")[0];
    let steps = Number(userWayOut[i].split(" ")[1]);

    if (command == "turnDown") {
      dirX = 0;
      dirY = 1;
      pathX.push("turnDown");
      pathY.push("turnDown");
      continue;
    } else if (command == "turnUp") {
      dirX = 0;
      dirY = -1;
      pathX.push("turnUp");
      pathY.push("turnUp");
      continue;
    } else if (command == "turnRight") {
      dirX = 1;
      dirY = 0;
      pathX.push("turnRight");
      pathY.push("turnRight");
      continue;
    } else if (command == "turnLeft") {
      dirX = -1;
      dirY = 0;
      pathX.push("turnLeft");
      pathY.push("turnLeft");
      continue;
    }

    for (let j = 0; j < steps * gridStep; j += 3) {
      addedX += 3 * dirX;
      addedY += 3 * dirY;
      pathX.push(Math.round(addedX));
      pathY.push(Math.round(addedY));
    }
    startX = pathX[pathX.length - 1];
    startY = pathX[pathY.length - 1];
  }

  return [pathX, pathY];
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 500) location.reload();
});

startButton.addEventListener("click", () => {
  if (isValid) {
    let instructions = document.querySelectorAll(".instruction");

    instructions.forEach((element) => {
      let command =
        element.children[0].value.trim() +
        " " +
        element.children[1].value.trim();
      userWay.push(command);
    });

    console.log(userWay);
    console.log(mainWay[variant - 1]);

    userWays = userWayToPath(startPointX, startPointY, userWay);

    equalsWays(userWay, mainWay[variant - 1]);
    console.log(rightWay);

    state = 2;
  }
});

function equalsWays(user, game) {
  if (user.length != game.length) {
    console.log("Different length");
    rightWay = false;
  } else {
    for (let i = 0; i < user.length; i++) {
      if (user[i] != game[i]) {
        console.log(
          `User command: ${user[i]}, Game command: ${game[i]}, index: ${i}`
        );
        rightWay = false;
      }
    }
  }
}

$(document).ready(function () {
  $("#add").click(function () {
    $(".editor .commands").append(`<div class="instruction">
    <input
      type="text"
      class="command"
      placeholder="КОМАНДА"
      pattern="forward|turnDown|turnUp|turnRight|turnLeft"
      required
      onchange="trimCommand(this)"
    />
    <input type="number" class="steps" placeholder="КРОКИ" max="20" min="1" onchange="checkSteps(this)" required/>

    <div class="del"></div>
  </div>`);
  });

  $("html").on("click", ".del", function () {
    $(this.parentElement).remove();
  });

  $("#add").mouseover(function () {
    $("#add").attr("src", "images/add_button_hover.svg");
  });
  $("#add").mouseout(function () {
    $("#add").attr("src", "images/add_button.svg");
  });
});
