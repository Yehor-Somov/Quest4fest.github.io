let addCommandButton = document.querySelector(".addCommand");

addCommandButton.addEventListener("mouseover", (event) => {
  event.target.setAttribute("src", "images/add_button_hover.svg");
});

addCommandButton.addEventListener("mouseout", (event) => {
  event.target.setAttribute("src", "images/add_button.svg");
});

addCommandButton.addEventListener("click", (event) => {
  let parent = document.querySelector(".editor .commands");

  let instruction = document.createElement("div");
  instruction.classList.add("instruction");
  instruction.innerHTML = `<input
    type="text"
    class="command"
    placeholder="КОМАНДА 2"
    pattern="forward|turnDown|turnUp|turnRight|turnLeft"
    required
    onchange="trimCommand(this)"
    />
    <input type="number" class="steps" placeholder="КРОКИ" max="20" min="1" onchange="checkSteps(this)" required/>

    <div class="del" onclick="deleteCommand(this);"></div>`;
  parent.append(instruction);
});

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

function deleteCommand(elem) {
  elem.parentElement.remove();
}
