"use strict";

const container = document.querySelector(".etch-a-sketch");

// Create 256 div elements and add them to the container
for (let i = 1; i <= 256; i++) {
  const div = document.createElement("div");
  div.className = `grid-item-${i}`;
  div.classList.add("grid-item");
  container.appendChild(div);
}
