"use strict";

// Selectors
const grid = document.querySelector(".main__grid");
const colorPicker = document.getElementById("color-picker");
const eraser = document.getElementById("eraser");
const clearButton = document.getElementById("clear-button");
const gridSizePicker = document.getElementById("grid-size-picker");
const gridSizeText = document.querySelector(".main__show-grid-size");

// Debounce function to delay the execution of a function
function debounce(func, delay) {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

// When the user picks a color, update the color picker's display
colorPicker.addEventListener("input", () => {
  const selectedColor = colorPicker.value;
  colorPicker.style.backgroundColor = selectedColor;
});

// Function to set up the drawing grid based on the selected grid size
function makeEtchWork() {
  const desiredWidth = 640; // Desired width for the grid in pixels
  const gridSize = gridSizePicker.value;

  // Calculate the size of each column and row to fit the desired width
  const cellSize = desiredWidth / gridSize;

  // Adjust the grid's columns and rows based on the selected size
  grid.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize}px)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize}px)`;

  // Create grid cells (divs) based on the selected size
  for (let i = 1; i <= gridSize ** 2; i++) {
    const div = document.createElement("div");
    div.className = `main__grid-items grid-item-${i}`;
    grid.appendChild(div);
  }

  // Add interactivity to the grid cells
  const gridItems = document.querySelectorAll(".main__grid-items");

  let isDrawing = false;
  let isClicking = false;

  gridItems.forEach((item) => {
    let eraserState = false;

    // Toggle the eraser on/off when the eraser button is clicked
    eraser.addEventListener("click", function () {
      eraserState = !eraserState;
    });

    item.addEventListener("mousedown", function () {
      isDrawing = true;
    });

    item.addEventListener("mouseup", function () {
      isDrawing = false;
    });

    item.addEventListener("mousemove", function (event) {
      if (isDrawing) {
        const selectedColor = colorPicker.value;
        const clickedItem = event.target;

        if (eraserState) {
          // Apply the fade-out animation class
          clickedItem.classList.add("fade-out");

          // Remove the fade-out class and change the background color after the animation
          setTimeout(() => {
            clickedItem.style.backgroundColor = "whitesmoke";
            clickedItem.classList.remove("fade-out");
          }, 200); // 200 milliseconds (0.2 seconds) delay
        } else {
          clickedItem.style.backgroundColor = selectedColor;

          // Apply the fade-in animation class
          clickedItem.classList.add("fade-in");

          // Remove the fade-in class after the animation
          setTimeout(() => {
            clickedItem.classList.remove("fade-in");
          }, 200); // 200 milliseconds (0.2 seconds) delay
        }
      }
    });

    clearButton.addEventListener("click", function () {
      item.style.backgroundColor = "whitesmoke";
      eraserState = false;
    });

    colorPicker.addEventListener("click", function () {
      eraserState = false;
    });
  });
}

// Create a debounced version of makeEtchWork with a 300ms delay
const debouncedMakeEtchWork = debounce(makeEtchWork, 300);

// When the user selects a new grid size, update the display and redraw the grid
gridSizePicker.addEventListener("input", function () {
  const sliderValue = gridSizePicker.value; // Get the current slider value

  // Update the display element to show the selected grid size
  gridSizeText.textContent = sliderValue;

  // Clear the existing grid cells
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  // An array of grid sizes to execute makeEtchWork for
  const gridSizesToExecuteMakeGridWork = [
    "64",
    "63",
    "62",
    "61",
    "60",
    "59",
    "58",
    "57",
    "56",
    "55",
    "54",
    "53",
    "52",
    "51",
    "50",
    "49",
    "48",
    "47",
    "46",
    "45",
    "44",
    "43",
    "42",
    "41",
    "40",
    "39",
    "38",
    "37",
    "36",
    "35",
    "34",
    "33",
    "32",
    "31",
    "30",
    "29",
    "28",
    "27",
    "26",
    "25",
    "24",
    "23",
    "22",
    "21",
    "20",
    "19",
    "18",
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
  ];

  // Execute makeEtchWork when the selected size matches a value in the array
  gridSizesToExecuteMakeGridWork.forEach((value) => {
    if (sliderValue === value) {
      debouncedMakeEtchWork(); // Use the debounced function to delay execution
    }
  });
});

// Call makeEtchWork at the end of your code to ensure it runs after everything else.
makeEtchWork();
