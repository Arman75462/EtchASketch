"use strict";

/* Selectors */
const container = document.querySelector(".main__grid");
const colorPicker = document.getElementById("color-picker");

// Based on chosen color, change the circle's color
colorPicker.addEventListener("input", () => {
  const selectedColor = colorPicker.value;
  colorPicker.style.backgroundColor = selectedColor;
});

// Create 256 div elements and add them to the container
for (let i = 1; i <= 256; i++) {
  const div = document.createElement("div");
  div.className = `main__grid-item grid-item-${i}`; // Add both classes
  container.appendChild(div);
}
