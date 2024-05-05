const currentMain = document.querySelector('.firstN');
const decimalBtn = document.querySelector('.decimal');
const clearBtn = document.querySelector('.clear');
const numButtons = document.querySelectorAll('.num');
const undoBtn = document.querySelector('.undo');
const operatorBtn = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const smallDisplay = document.querySelector('.thirdN');

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
}))

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
})

// how to use decimal one times
decimalBtn.addEventListener('click', () => {
    if(currentNum.includes('.')){
        return;
    }
    else {
        currentNum += decimalBtn.innerText;
        smallDis += `${decimalBtn.innerText}`
        updateDispalys();
    }
})

// undo button
undoBtn.addEventListener('click', () => {
    currentNum = currentNum.slice(0, -1);
    updateDispalys();
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

equalBtn.addEventListener('click', () => {
    console.log(mathOperators, currentNum);
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