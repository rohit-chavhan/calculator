const currentMain = document.querySelector('.firstN');
const smallDisplay = document.querySelector('.thirdN');
const undoBtn = document.querySelector('.undo');
const numButtons = document.querySelectorAll('.num');
const decimalBtn = document.querySelector('.decimal');
const clearBtn = document.querySelector('.clear');
const operatorBtn = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');

let previousNum = '';
let currentNum = '';
let mathOperators = '';
let smallDis = '';
let usedEqual = 0;

function updateDispalys(){
    currentMain.innerHTML = currentNum;
    smallDisplay.innerHTML = smallDis;
}

numButtons.forEach(el => el.addEventListener('click', () => {
    currentNum += el.innerText;
    smallDis += el.innerText;
    updateDispalys();
}));

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

// how to use decimal one times
decimalBtn.addEventListener('click', () => {
   decimalFunc();
})

function undoFunc(){
    currentNum = currentNum.slice(0, -1);
    smallDis = smallDis.slice(0, -1);
    updateDispalys();
}

// undo button
undoBtn.addEventListener('click', () => {
    undoFunc();
})

function mathFunctions(mathSymbol){
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
            console.log("great");
            currentNum = previousNum / currentNum;
            break;
    }
}

function addintToSmall(x){
    smallDis += ` ${x} `;
    currentNum = '';
}

function operations(n) {
    if(previousNum === '') {
        previousNum = currentNum;
        addintToSmall(n);
        updateDispalys();
    }
    else if(usedEqual !== 0){
        addintToSmall(n);
        usedEqual -= 1;
    }
    else {
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

function removeDecimal(n){
    n = Number(n);
    if(!Number.isInteger(n)) {
        n = n.toFixed(3);
        console.log(n);
        currentNum = String(n);
    }
}
let kafka = 0;
equalBtn.addEventListener('click', () => {
    kafka += 1;
    console.log("kafka",kafka);
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
})

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
    console.log(pressedKey,typeof pressedKey);
  }

  document.addEventListener('keydown', handleKeyboardInput);