"use strict";

/* Selectors */
const container = document.querySelector(".main__grid");
const colorPicker = document.getElementById("color-picker");
const eraser = document.getElementById("eraser");
const clearButton = document.getElementById("clear-button");

// Based on chosen color, change the circle's color
colorPicker.addEventListener("input", () => {
  const selectedColor = colorPicker.value;
  colorPicker.style.backgroundColor = selectedColor;
});

// Create 256 div elements and add them to the container
for (let i = 1; i <= 4096; i++) {
  const div = document.createElement("div");
  div.className = `main__grid-items grid-item-${i}`; // Add both classes
  container.appendChild(div);
}

const gridItems = document.querySelectorAll(".main__grid-items");

// Depending on clicked button, executes order
gridItems.forEach((item) => {
  let eraserState = false;

  eraser.addEventListener("click", function () {
    eraserState = !eraserState; // Toggle eraser state
  });

  item.addEventListener("mousemove", function (event) {
    const selectedColor = colorPicker.value;
    item.style.backgroundColor = selectedColor;

    const clickedItem = event.target;

    if (eraserState) {
      clickedItem.style.backgroundColor = "whitesmoke"; // Erase if eraser is active
    } else {
      clickedItem.style.backgroundColor = selectedColor; // Set selected color
    }
  });

  // Clears the grid and puts eraserState to inactive
  clearButton.addEventListener("click", function () {
    item.style.backgroundColor = "whitesmoke";
    eraserState = false;
  });

  // When clicking colorPicker, eraserState is inactive
  colorPicker.addEventListener("click", function () {
    eraserState = false;
  });
});
