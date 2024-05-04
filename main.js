// round the number if it has number after decimal values
// only one decimal is allowed
// clear functionality
// if user tries to divide by 0 return error
// add a backspace button

// first let calculator to handle simple stuff

const currentMain = document.querySelector('.firstN');
const previousMain = document.querySelector('.secondN');
const decimalBtn = document.querySelector('.decimal');
const clearBtn = document.querySelector('.clear');
const numButtons = document.querySelectorAll('.num');
const undoBtn = document.querySelector('.undo');
const operatorBtn = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');

let previousNum = '';
let currentNum = '';
let mathOperators = '';

function updateDispalys(){
    previousMain.innerHTML = previousNum;
    currentMain.innerHTML = currentNum;
}

numButtons.forEach(el => el.addEventListener('click', () => {
    currentNum += el.innerText;
    updateDispalys();
}))

// clear button
clearBtn.addEventListener('click', () => {
    previousNum = '';
    currentNum = '';
    mathOperators = '';
    updateDispalys();
})

// how to use decimal one times
decimalBtn.addEventListener('click', () => {
    if(currentNum.includes('.')){
        return;
    }
    else {
        currentNum += decimalBtn.innerText;
        updateDispalys();
    }
})

// undo button
undoBtn.addEventListener('click', () => {
    currentNum = currentNum.slice(0, -1);
    updateDispalys();
})

// 3 things to see 
// one when previous value is empty
// second when previous value is filled 
// and in both we have operator with us
// and keep in mind of how would u display both screen

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
            currentNum = previousNum / currentNum;
            break;
    }
    previousNum = '';
    mathOperators = '';
    updateDispalys();
}

function operations() {
if(previousNum === '') {
    previousNum = currentNum;
    currentNum = '';
    updateDispalys();
}
else {
    mathFunctions(mathOperators);
}
}

operatorBtn.forEach(el => el.addEventListener("click", () => {
    console.log("great");
    operations();
    mathOperators += el.innerText;
}));

equalBtn.addEventListener('click', () => {
    console.log("equal");
    mathFunctions(mathOperators);
})