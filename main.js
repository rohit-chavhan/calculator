const currentMain = document.querySelector('.firstN');
const smallDisplay = document.querySelector('.thirdN');
const undoBtn = document.querySelector('.undo');
const numButtons = document.querySelectorAll('.num');
const decimalBtn = document.querySelector('.decimal');
const clearBtn = document.querySelector('.clear');
const operatorBtn = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');

// storing data

let previousNum = '';
let currentNum = '';
let mathOperators = '';
let smallDis = '';
let usedEqual = 0;

// it updates main and previous displays

function updateDispalys(){
    currentMain.innerHTML = currentNum;
    smallDisplay.innerHTML = smallDis;
}

// event listener to all buttons from 0 to 9

numButtons.forEach(el => el.addEventListener('click', () => {
    currentNum += el.innerText;
    smallDis += el.innerText;
    updateDispalys();
}));

// wipe outs all data, start new

function clearFunc(){
    previousNum = '';
    currentNum = '';
    mathOperators = '';
    smallDis = '';
    updateDispalys();
}

// clear button

clearBtn.addEventListener('click', () => {
    clearFunc();
});

// decimal functionality

function decimalFunc() {
    if(currentNum.includes('.')){
        return;
    }

    else {
        currentNum += decimalBtn.innerText;
        smallDis += `${decimalBtn.innerText}`
        updateDispalys();
    }
}

// decimal button

decimalBtn.addEventListener('click', () => {
   decimalFunc();
})

// undo functionality

function undoFunc(){
    currentNum = currentNum.slice(0, -1);
    smallDis = smallDis.slice(0, -1);
    updateDispalys();
}

// undo button

undoBtn.addEventListener('click', () => {
    undoFunc();
})

// checks math operator and run that type of funcion on it

function mathFunctions(mathSymbol){
    console.log(`inside math function cNum is ${currentNum} pNum ${previousNum} and mathsymbol is ${mathSymbol}` );
    currentNum = Number(currentNum);
    previousNum = Number(previousNum);

    switch(mathSymbol){
        case '+':
            currentNum = currentNum + previousNum;
            break;
        case '-':
            currentNum = previousNum - currentNum;
            break;
        case 'x':
            currentNum = previousNum * currentNum;
            break;
        case '/':
            currentNum = previousNum / currentNum;
            break;
    }
}

function addintToSmall(x){
    smallDis += ` ${x} `;
    currentNum = '';
}

/* grabbing number if smaller screen is empty when any operator is pressed  
   we are just holding the current value in another varaible
   else => if both values are filled we run our operations */

function operations(n) {
    console.log(n);
    if(previousNum === '') {
        console.log("first if");
        previousNum = currentNum;
        addintToSmall(n);
        updateDispalys();
    } 

    else if(usedEqual !== 0){
        console.log("else if run of equal");
        addintToSmall(n);
        usedEqual -= 1;
    }

    else {
        console.log("last else means math functions run");
        mathFunctions(mathOperators);
        smallDis += ` = ${currentNum} ${n} `;
        previousNum = currentNum;
        currentNum = '';
        mathOperators = '';
        updateDispalys();
    }
}

operatorBtn.forEach(el => el.addEventListener("click", () => {
    operations(el.innerText);
    mathOperators += el.innerText;
}));

// remove extra decimal we cap at 3

function removeDecimal(n){
    n = Number(n);
    if(!Number.isInteger(n)) {
        n = n.toFixed(3);
        currentNum = String(n);
    }
}

// equal button checks for running equal empty numbers

equalBtn.addEventListener('click', () => {
    console.log("we pressed equal button");
    if(mathOperators === '/' && currentNum === '0') {
        clearFunc();
        alert("u cannot divide number by zero which is an invalid operation in mathematics !");
        return;
    }

    if(currentNum === '' || previousNum === ''){
        clearFunc();
        return;
    }

    usedEqual += 1;
    mathFunctions(mathOperators);
    removeDecimal(currentNum);
    smallDis += ` = ${currentNum} `;
    previousNum = currentNum;
    mathOperators = '';
    updateDispalys();
});

// handling keyboard input from user

function handleKeyboardInput(event) {
    const pressedKey = event.key;
    const operati = ['+', '-', '/', '*'];
  
    if (/^[0-9]$/.test(pressedKey)) {
      const buttonToClick = Array.from(numButtons).find(button => button.innerText === pressedKey);
        if (buttonToClick) {
        buttonToClick.click();
        }
    }

    else if (pressedKey === '.') {
      decimalBtn.click();
    }

    else if (pressedKey === 'Backspace') {
      undoBtn.click();
    }

    else if (pressedKey === 'Enter') {
      equalBtn.click();
    }

    else if(operati.includes(pressedKey)) {
        operations(pressedKey);
        mathOperators += pressedKey;
    }

    else if(pressedKey === 'c') {
        clearFunc();
    }
};

document.addEventListener('keydown', handleKeyboardInput);