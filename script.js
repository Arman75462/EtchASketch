"use strict";

/* GLOBAL VARIABLES */
let eraserState = false;

/* SELECTORS */
const grid = document.querySelector(".main__grid");
const colorPicker = document.getElementById("color-picker");
const eraser = document.getElementById("eraser");
const clearButton = document.getElementById("clear-button");
const gridSizePicker = document.getElementById("grid-size-picker");
const gridSizeText = document.querySelector(".main__show-grid-size");

/* FUNCTIONS */
// Delays the execution of a function by the specified amount of time
function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Updates the style of the eraser button based on the eraser state
function updateEraserStyle() {
  eraser.style.border = eraserState ? "2px solid black" : "none";
}

// Applies color or erases grid cells based on the eraser state and mouse movement
function handleMouseMove(event) {
  if (event.buttons === 1) {
    const selectedColor = colorPicker.value;
    const clickedItem = event.target;

    if (eraserState) {
      clickedItem.classList.add("fade-out");
      setTimeout(() => {
        clickedItem.style.backgroundColor = "whitesmoke";
        clickedItem.classList.remove("fade-out");
      }, 200); // Delay for fade-out animation
    } else {
      clickedItem.style.backgroundColor = selectedColor;
      clickedItem.classList.add("fade-in");
      setTimeout(() => clickedItem.classList.remove("fade-in"), 200); // Delay for fade-in animation
    }
  }
}

// Configures the grid size and creates grid cells based on the selected size
function makeEtchWork() {
  const desiredWidth = 450; // Desired width for the grid in pixels
  const gridSize = gridSizePicker.value;
  const cellSize = desiredWidth / gridSize;

  grid.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize}px)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize}px)`;

  grid.innerHTML = ""; // Clear existing cells
  for (let i = 1; i <= gridSize ** 2; i++) {
    const div = document.createElement("div");
    div.className = `main__grid-items grid-item-${i}`;
    grid.appendChild(div);
  }

  document.querySelectorAll(".main__grid-items").forEach((item) => {
    item.addEventListener("mousemove", handleMouseMove);
    item.addEventListener("mousedown", handleMouseMove);
  });
}

// Creates a debounced version of the makeEtchWork function
const debouncedMakeEtchWork = debounce(makeEtchWork, 300);

/* EVENT LISTENERS */
// Toggles the eraser mode and updates the eraser button's border
eraser.addEventListener("click", function () {
  eraserState = !eraserState;
  updateEraserStyle(); // Update eraser style when toggled
});

// Updates the background color of the color picker to the selected color
colorPicker.addEventListener("input", function () {
  colorPicker.style.backgroundColor = colorPicker.value;
});

// Reset eraser state when the color picker is clicked
colorPicker.addEventListener("click", function () {
  eraserState = false;
  updateEraserStyle(); // Update eraser style when color picker is clicked
});

// Clear grid and reset eraser state when the clear button is clicked
clearButton.addEventListener("click", function () {
  document.querySelectorAll(".main__grid-items").forEach((item) => {
    item.style.backgroundColor = "whitesmoke";
  });
  eraserState = false;
  updateEraserStyle(); // Update eraser style when grid is cleared
});

// Update grid size and redraw the grid when the grid size picker value changes
gridSizePicker.addEventListener("input", () => {
  const sliderValue = gridSizePicker.value;
  gridSizeText.textContent = sliderValue;
  debouncedMakeEtchWork(); // Use debounced function to update grid
});

// Create the initial grid setup
makeEtchWork();
