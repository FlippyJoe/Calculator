// Bringing in the elements

// On- off buttons
const onBtn = document.querySelector(`.onBtn`);
const offBtn = document.querySelector(`.offBtn`);

// Display of the calculator
const screen = document.querySelector(`.screen`);

// Text: `Turn me on`
const turnMeOn = document.querySelector(`.turnMeOn`);

// Number buttons
const numbBtns = document.querySelectorAll(`.numberBtn`);

// Operation buttons
const opBtns = document.querySelectorAll(`.opBtn`);

// Clear (`C`) button
const clearDisplay = document.querySelector(`.clearDisplay`);

// Backspace button
const backSpace = document.querySelector(`.backSpace`);

// Equal button
const equalBtn = document.querySelector(`.equal`);

// Decimal button
/* Adds a decimal point where it needed. You will be able to have a maximum of 1 decimal point.*/
const decimalBtn = document.querySelector(`.decimalBtn`);

// Declaring numbers and operations
let currentNumber = ``;
let previousNumber = ``;
let currentOperation = null;

// Adding functionality
// Number buttons
const maxLength = 15; // Set the maximum number of characters

numbBtns.forEach((button) => {
  button.addEventListener(`click`, () => {
    if (currentNumber.length < maxLength) {
      let number = button.textContent;
      currentNumber += number;
      screen.textContent = currentNumber;
    }
  });
});

// Operation buttons
opBtns.forEach((button) => {
  button.addEventListener(`click`, () => {
    previousNumber = currentNumber;
    currentNumber = ``;
    currentOperation = button.textContent;
  });
});

// Decimal button
decimalBtn.addEventListener(`click`, () => {
  if (!currentNumber.includes(`.`)) {
    currentNumber += `.`;
    screen.textContent = currentNumber;
  }
});

// Clear (`C`) button
clearDisplay.addEventListener(`click`, () => {
  currentNumber = ``;
  previousNumber = ``;
  currentOperation = null;
  screen.textContent = ``;
});

// Equal button

// Setting maximum length of result
const maxResultLength = 15;

equalBtn.addEventListener(`click`, () => {
  if (
    currentNumber === `` ||
    previousNumber === `` ||
    currentOperation === ``
  ) {
    screen.textContent = `Invalid operation`;
    alert(
      `Something is wrong buddy, check if you have everything: numb1, operation, numb2, equal. Now go back, press \`C\` and give it another try!`
    );
    currentNumber = ``;
    previousNumber = ``;
    currentOperation = null;
    return;
  }

  const numb1 = parseFloat(previousNumber);
  const numb2 = parseFloat(currentNumber);
  let result;

  if (numb2 === 0) {
    screen.textContent = `Error: dividing by zero`;
    currentNumber = ``;
    previousNumber = ``;
    currentOperation = null;
    return;
  }

  if (currentOperation === `/`) {
    result = numb1 / numb2;
  } else if (currentOperation === `X`) {
    result = numb1 * numb2;
  } else if (currentOperation === `--`) {
    result = numb1 - numb2;
  } else if (currentOperation === `+`) {
    result = numb1 + numb2;
  } else if (currentOperation === `%`) {
    result = numb1 * (numb2 / 100);
  }

  // Convert result to string and truncate if needed
  result = result.toString();
  if (result.length > maxResultLength) {
    result = result.slice(0, maxResultLength);
  }

  screen.textContent = result;
  currentNumber = result;
  previousNumber = ``;
  currentOperation = null;
});

// Backspace button
backSpace.addEventListener(`click`, () => {
  currentNumber = currentNumber.slice(0, -1);
  screen.textContent = currentNumber;
});

// On- Off buttons

/* On button */
onBtn.addEventListener(`click`, () => {
  offBtn.style.display = `flex`;
  onBtn.style.display = `none`;
  numbBtns.forEach((number) => {
    number.style.opacity = 1;
  });
  opBtns.forEach((button) => {
    button.style.opacity = 1;
  });
  decimalBtn.style.opacity = 1;
  equalBtn.style.opacity = 1;
  clearDisplay.style.opacity = 1;
  backSpace.style.opacity = 1;
  turnMeOn.style.display = `none`;
  screen.style.scale = 1;
  screen.textContent = ``;
  currentNumber = ``;
  previousNumber = ``;
  currentOperation = null;
});

/* Off button */
offBtn.addEventListener(`click`, () => {
  offBtn.style.display = `none`;
  onBtn.style.display = `flex`;
  numbBtns.forEach((number) => {
    number.style.opacity = 0.3;
  });
  opBtns.forEach((button) => {
    button.style.opacity = 0.3;
  });
  decimalBtn.style.opacity = 0.3;
  equalBtn.style.opacity = 0.3;
  clearDisplay.style.opacity = 0.3;
  backSpace.style.opacity = 0.3;
  screen.style.scale = 0;
  screen.textContent = ``;
  currentNumber = ``;
  previousNumber = ``;
  currentOperation = null;
  turnMeOn.style.display = `block`;
});
