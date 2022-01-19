// function drawWay(way) {
//   let x_start = startPointX;
//   let y_start = startPointY;
//   let x_dir = 1;
//   let y_dir = 0;
//   let x_end = startPointX;
//   let y_end = startPointY;

//   for (let i = 0; i < way.length; i++) {
//     let command = way[i].split(" ")[0];
//     let steps = Number(way[i].split(" ")[1]);

//     if (command == "turnDown") {
//       x_dir = 0;
//       y_dir = 1;
//       continue;
//     } else if (command == "turnUp") {
//       x_dir = 0;
//       y_dir = -1;
//       continue;
//     } else if (command == "turnRight") {
//       x_dir = 1;
//       y_dir = 0;
//       continue;
//     } else if (command == "turnLeft") {
//       x_dir = -1;
//       y_dir = 0;
//       continue;
//     }

//     for (let j = 0; j < steps; j++) {
//       x_end += x_dir * gridStep;
//       y_end += y_dir * gridStep;
//     }
//     stroke(0);
//     strokeWeight(5);
//     line(x_start, y_start, x_end, y_end);
//     x_start = x_end;
//     y_start = y_end;
//     //console.log(x_start, y_start, x_end, y_end);
//   }
// }

// function grid() {
//   stroke(170);
//   strokeWeight(1);
//   for (let i = 0; i <= width; i += gridStep) {
//     line(i, 0, i, height);
//   }
//   for (let i = 0; i <= height; i += gridStep) {
//     line(0, i, width, i);
//   }
// }

window.addEventListener("resize", () => {
  // let side = window.innerWidth / 2.4;
  // resizeCanvas(side, side);

  // w = window.innerWidth / 2.4 + 40;
  // document.querySelector(".userArea").style.width = w + "px";

  // img = loadImage("Quant-Right.png");
  // game_map = loadImage(`maps/${variant}.svg`);
  // //game_map.resize(width, 0);
  // playerX = startPointX;
  // playerY = startPointY;
  location.reload();
});
