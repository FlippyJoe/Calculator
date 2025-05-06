# Simple Calculator project

## The project is built by using HTML for structure (_index.html_), CSS for styling (_style.css_) and JavaScript (_script.js_) for functionality.

[[TOC]]

### HTML

- To ensure that I follow the HTML semantic rules I used _sections_ to separate the different main parts of the calculator and _articles_ as sub-sections.
- `<main class="bodyOfCalculator">` serves as the main container that keeps all parts of the project in one piece
- I needed multiple sub-containers to be able effectively control the style and appearance
- `<section class="screenContainer">` is the first one, that containes a welcome message `<article class="turnMeOn">Turn me on baby...</article>` which appears on the place of the screen `<article class="screen"></article>` upon opening the application. Once the switch button is toggled >On status this message disappears and the screen takes its place.
- `<section class="buttonsContainer">` contains all the number and function buttons, including the _On- Off_ buttons.
- For creating the buttons I used the standard keyboard buttons, with two exceptions:
- **Back space button:** Font Awesome `<i class="fas fa-backspace"></i>`
- **Minus sign:** double minus sign for better visibility

---

### CSS

#### Body, HTML

- To eliminate the browsers` default margin and padding I applied the following sttings:

```
html,
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

```

- This setting also ensures that the _box-sizing_ is _border-box_, hence the size of the elements will include _margin_, _padding_ and _border_.
- I set the _body height_ and _body width_ to 100% of the screen with _overflow:hidden_

  ```
  body {
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
  background-color: rgb(89, 88, 88);
  }
  ```

ensuring that the page will not move for scroll, also it enabled me to use relative measurements (%) for defining the size of the calculator itself.

#### Screen container, screen, welcome message

- I used _flexbox -flex-direction: column_ as display of the _.screenContainer_ which enabled me to place on top of eachother the two elements, which are the display of the calculator and the welcome message _Turn me on baby..._
- Once the application is open the screen is hidden by setting its scale to zero, which will change to scale: 1 once the calculator is switched on.
- Screen display is _flexbox -flex-direction: row; justify-content: flex-end_ which setting will force the screen content to the right. To prevent the numbers appearing at the very end (either right, or, in case of long numbers, left)I applied 10px right padding and 5px left padding.
- I applied a _transition: 0.4s_ _transition duration_ for smooth appearance of the screen (=> happens for turning the calculator on)
- The _Turn me on baby..._ welcome message appears with lower contrast on the screen. A _@keyframes_ animation and JavaScript _eventListener_ control its appear- disappear behaviour. Keyframe animation is responsible for the scale (0 to 1) of the element and the _display_ property will be handled by the _eventListener_.

#### Buttons

##### Buttons container

- The _buttonsContainer_ holds all the buttons that are visible on the screen.
- I set _display: grid_ for easily control the location of the buttons and the layout of the area.
- _grid-template-columns: repeat(4, 1fr)_ ensures that independently of screen size and orientation, the calculator will have the same appearance and layout at all times.
- _column-gap: 0.5rem_ keeps a consistence distance between the columns, while _row-gap: 1rem_ does the same with the distance between rows.

#### Buttons

In general all buttons have _display: flex; flex-direction: column; align-items: center_ setting to ensure consistency in centered _content_.

- I achieved responsive font-size using _clamp()_ function
- _border-radius: 50%_ provides the circle shape of the buttons
- As _hover-effect_ the mouse cursor changes for pointer style upon hovering any of the buttons
- _Number buttons and Function buttons_ have a default _opacity: 0.3_ setting which makes them faded on the launch screen. This will change once the calculator is turned on.

##### Switch buttons _On- and off buttons_

- To get the oval shape of these two buttons (_making them stand out_) I set the width 2.8rem and left the default nutton height
  `height: clamp(1.9rem, 1.5vw, 2.2rem);` as it is set for all the buttons.

###### On- button

- By default this button is the only fully visible _button_ element on the calculator upon opening the application.
- By clicking the button it disappears alongside with the welcome message and the calculator becomes functional. Its place will be taken by the _Off_ button.

###### Off- button

- Default _display: none_ property hides this button until tkhe _On_ button is clicked.

---

### JavaScript

For declaring th eelements I used _document.querySelector() and document.querySelectorAll()_ due to their flexibility.

#### Bringing in the elements

##### **On- off buttons**

`const onBtn = document.querySelector(`.onBtn`);`

`const offBtn = document.querySelector(`.offBtn`);`

These will operate as a switch button to activate or send to sleep the calculator.

##### **Display of the calculator**

`const screen = document.querySelector(`.screen`);`

##### **Turn me on baby...**

To call attention to the switch buttons. To be able to use the calculator you need to turn it on. This text will disappear when the calculator is turned on, and re-appear when the calculator is off.

`const turnMeOn = document.querySelector(`.turnMeOn`);`

##### **Number buttons**

As I used _querySelectorAll()_, which returns a _nodeList_.
To be able to use the buttons I will need to loop through the number buttons using _.forEach()_ method.

`const numbBtns = document.querySelectorAll(`.numberBtn`);`

##### **Operation buttons**

The same applies as for the _number buttons_. I used _querySelectorAll()_, and for succesfull application of the buttons I will use _.forEach() method._

`const opBtns = document.querySelectorAll(`.opBtn`);`

##### **Clear display button ("C")**

It will erase the full content of the calculator display.

`const clearDisplay = document.querySelector(`.clearDisplay`);`

##### **Backspace button**

Eliminates the last digit of the entered characters.

`const backSpace = document.querySelector(`.backSpace`);`

##### **Equal button**

It will result either in an error message, or, the result of the calculation. Possible reasons for error messages:

- missing previous number, current number, or, arithmetic operation.
- dividing by zero

`const equalBtn = document.querySelector(`.equal`);

##### **Decimal button**

Adds a decimal point where it needed.

`const decimalBtn = document.querySelector(`.decimalBtn`);`

#### **Declaring** **_currentNumber, previousNumber, and currentOperation_** **variables**

Numbers are decalred as an empty _string_ to enable concatenation when the subject of the operation (_a number_) contains more than one digit. Later on, for succesful arithmetic operations I will convert them back to numbers using
_.parseFloat()_ method.
For clarity purposes I assigned _null_ value to the _currentOperations_ variable.

` let currentNumber = ``; `
` let previousNumber = ``; `
`let currentOperation = null;`

#### **Adding functionality**

##### **Number buttons**

```
const maxLength = 15;
```

```
numbBtns.forEach((button) => {
  button.addEventListener(`click`, () => {
    if (currentNumber.length < maxLength) {
      let number = button.textContent;
      currentNumber += number;
      screen.textContent = currentNumber;
    }
  });
});
```

###### Line by line

0. To prevent overflow the maximum number of characters is limited
1. calling _.forEach()_ method to be able to set the _eventListener_ to all buttons
2. adding the _eventListener_ and opening the _callback_ function
3. If the length of the entered characters is smaller than the pre-set maximum length, the calculator will...
4. ...assign the _text value_ of each buttons to a variable called _number_
5. This _number_ is assigned as value of the _currentNumber_. Using _+=_ I ensure that the number value will not only be assigned, but also concatenated if more than one characters are building up a longer number (_concatenation_).
6. The entered number appears on the _screen_ of the calculator

##### **Operation buttons**

```
opBtns.forEach((button) => {
  button.addEventListener(`click`, () => {
    previousNumber = currentNumber;
    currentNumber = ``;
    currentOperation = button.textContent;
  });
});
```

Similarly to the way of working with the _number buttons_ I use _.forEach()_ method to gain access to each of the buttons and target all of them with the _eventListener_. The _previousNumber_ gets its first value in the form of the _currentNumber_, _currentNumber_ is set as _empty string_ again, and the _textContent_ of the operation buttons is assigned as the value of the _currentOperation_ variable.

##### **Decimal button**

```
decimalBtn.addEventListener(`click`, () => {
  if (!currentNumber.includes(`.`)) {
    currentNumber += `.`;
    screen.textContent = currentNumber;
  }
});
```

The _if()_ statement ensures that only 1 decimal point can be used per number.

##### **Clear ("C") button**

```
clearDisplay.addEventListener(`click`, () => {
  currentNumber = ``;
  previousNumber = ``;
  currentOperation = null;
  screen.textContent = ``;
});
```

It sets all variables back to their initial stage

##### **Equal button**

The equal button may bring to the attention the cause of an error, or, the result of the calculation.
Possible reasons for error are listed above.

This is the time for converting the currentNumber and previousNumber values (string) into numbers for succesful calculation. The converted value will be assigned to new variables that will be used only in this function.

_Piece by piece..._

0. Setting the maximum length of the result to prevent overflow
   ```
   const maxResultLength = 15;
   ```
1. Adding _eventListener_ and opening the _callback_ function
2. The first _if()_ statement will display and _error message_ on the screen of the calculator, also, a pop-up alert on the _window_ if the User

- tries to perform calculation with only one number
- doesn`t specify operation before clicking on the _equal_ button

```
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
```

3. Converting the values of the _previousNumber_ and _currentNumber_ variables into _decimal number values_ and assigning their values into new variables called **numb1** and **numb2**. Arithmetic operations will be performed on these variables.

```
const numb1 = parseFloat(previousNumber);
  const numb2 = parseFloat(currentNumber);
  let result;
```

4. If the User tries to divide a number with zero the second _if()_ statement will return and display on the screen of the calculator an _error message_

```
if (numb2 === 0) {
    screen.textContent = `Error: dividing by zero`;
    currentNumber = ``;
    previousNumber = ``;
    currentOperation = null;
    return;
  }
```

5. Defining the arithmetic operations based on the values of _numb1_ and _numb2_ variables
   - division
   - multiplication
   - deduction
   - addition
   - percentage calculation

The result is displayed on the screen of the calculator. To enable the User for further calculations with the result I set the value of the _currentNumber_ to the _result_. The values of the _previousNumber_
and _currentOperation_ variables are set to default.

```
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


  result = result.toString();
  if (result.length > maxResultLength) {
    result = result.slice(0, maxResultLength);
  }

  screen.textContent = result;
  currentNumber = result;
  previousNumber = ``;
  currentOperation = null;
});

```

Using _.toString()_ method I convert the result intro string format, which step will enable me to compare the _length_ of the result to the pre-set _maxResultLength_. If the length of the _result_ is greater than the _maxResultLength_ using _.slice()_ method I eliminate the the characters coming after the maximum set number. COnverting the values is necessary, as _.length()_ can be used only on _strings_ and _arrays._

##### **Backspace button**

Eliminates the last entered digit by using the _slice()_ method. One digit will be eliminated at a time, by keep pressing the button the User can clear the display of the calculator.

```
backSpace.addEventListener(`click`, () => {
  currentNumber = currentNumber.slice(0, -1);
  screen.textContent = currentNumber;
});
```

##### **On- off buttons**

Both buttons will clear the display and number values entered. Doing so the calculator will behave like it was really off, even if someone is interacting with the buttons while it`s sleeping. The same happens when the User switches it off: it will erease all the entered numbers/operations.

1. **On button**

```
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
```

2. **Off button**

```
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
```

### Possible future improvements on the project

- Enabling Users to enter characters using keyboard
- Instead of limiting the length of characters and/or length of result -> enabling multi-line character entry and multi-line result on display
- I`m open for suggestions... :)
