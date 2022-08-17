function checkSteps(element) {
  neir = element.previousElementSibling.value;
  if (
    neir === "turnRight" ||
    neir === "turnLeft" ||
    neir === "turnUp" ||
    neir === "turnDown"
  ) {
    element.min = 1;
    element.max = 1;
  } else {
    element.min = 2;
    element.max = 20;
  }

  if (element.value > 20) {
    element.value = 20;
  } else if (element.value < 1) {
    element.value = 1;
  }
}

function trimCommand(element) {
  element.value = element.value.trim();
}
