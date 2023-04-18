let stack=[]
let anshistory=""
let res=""

const symbol=['0','1','2','3','4','5','6','7','8','9','x','*','/','+','-','(',')']

const input=document.getElementsByClassName("input")[0]
const ans=document.getElementsByClassName("ans")[0]

const anshist=document.getElementById("anshist")
const del=document.getElementById("del")
const clear=document.getElementById("clear")
const enter=document.getElementById("enter")

const nonActionButtons = document.getElementsByClassName("nonAction");

window.onkeydown = (e)=>{
    console.log(e, !isNaN(e.key))
    const key = e.key
    if(!isNaN(key) || symbol.includes(key)){
      stack.push(key);
      input.innerText = stack.join(" ");
    }
  
    if(key === 'Delete' || key === 'Backspace'){
      stack.pop()
      input.innerText = stack.join(" ");
    }
  
    if(key === 'Enter'){
      const result = evaluate(stack);
      ans.innerText = result
      anshistory = result
    }
}

for (let i = 0; i < nonActionButtons.length; i++) {
    nonActionButtons[i].addEventListener("click", (e) => {
      stack.push(e.target.innerText);
      input.innerText = stack.join(" ");
    });
}

ans.addEventListener("click", () => {
    input.innerText = "ans = " + history;
    ans.innerText = 0
});
  
del.addEventListener("click", () => {
    stack.pop();
    input.innerText = stack.join(" ");
});
  
clear.addEventListener("click", () => {
    stack.length = 0;
    input.innerText = stack.join(" ");
    ans.innerText = stack.join(" ");
});
  
enter.addEventListener("click", () => {
    result = evaluate(stack)
    ans.innerText = result
    history = result
});
  

function evaluate(tokens) {
    let values = [];

    let ops = [];

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == " ") {
            continue;
        }

        if (tokens[i] >= "0" && tokens[i] <= "9") {
            let sbuf = "";
            while (i < tokens.length && tokens[i] >= "0" && tokens[i] <= "9") {
                sbuf = sbuf + tokens[i++];
            }
            values.push(parseInt(sbuf, 10));
            i--;
        }

        else if (tokens[i] == "(") {
            ops.push(tokens[i]);
        }

        else if (tokens[i] == ")") {
            while (ops[ops.length - 1] != "(") {
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
        }
        ops.pop();
        }
        else if (
        tokens[i] == "+" ||
        tokens[i] == "-" ||
        tokens[i] == "x" ||
        tokens[i] == "*" ||
        tokens[i] == "÷" ||
        tokens[i] == "/"
        ) {

        while (ops.length > 0 && hasPrecedence(tokens[i], ops[ops.length - 1])) {
            values.push(applyOp(ops.pop(), values.pop(), values.pop()));
        }
        ops.push(tokens[i]);
        }
    }

    while (ops.length > 0) {
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
    }

    return values.pop();
}

function hasPrecedence(op1, op2) {
    if (op2 == "(" || op2 == ")") {
      return false;
    }
    if ((op1 == "x" || op1 == "÷" || op1 == "/" || op1 == "*") && (op2 == "+" || op2 == "-")) {
      return false;
    } else {
      return true;
    }
}

function applyOp(op, b, a) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "x":
        return a * b;
      case "*":
        return a * b;
      case "÷":
        if (b == 0) {
          ans.innerText = "Cannot divide by zero";
          return parseInt(a / b, 10);
        }
      case "/":
        if (b == 0) {
          ans.innerText = "Cannot divide by zero";
        }
        return parseInt(a / b, 10);
    }
    return 0;
  }