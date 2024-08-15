import React, { useState } from 'react';

const buttonData = [
  { key: "clear", value: "AC" },
  { key: "operator", value: "/" },
  { key: "operator", value: "*" },
  { key: "number", value: "7" },
  { key: "number", value: "8" },
  { key: "number", value: "9" },
  { key: "operator", value: "-" },
  { key: "number", value: "4" },
  { key: "number", value: "5" },
  { key: "number", value: "6" },
  { key: "operator", value: "+" },
  { key: "number", value: "1" },
  { key: "number", value: "2" },
  { key: "number", value: "3" },
  { key: "equals", value: "=" },
  { key: "zero", value: "0" },
  { key: "decimal", value: "." }
];

const buttonClasses = {
  clear: "col-span-2 bg-red-600",
  operator: "bg-gray-400",
  number: "bg-gray-600",
  equals: "bg-blue-600 row-span-2",
  decimal: "bg-gray-600",
  zero: "col-span-2 bg-gray-600"
};

export default function Buttons({ display, setDisplay, setResult }) {
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [operator, setOperator] = useState("");

  const calculate = (a, b, operator) => {
    let result;
    switch (operator) {
      case "+":
        result = parseFloat(a) + parseFloat(b);
        break;
      case "-":
        result = parseFloat(a) - parseFloat(b);
        break;
      case "*":
        result = parseFloat(a) * parseFloat(b);
        break;
      case "/":
        result = parseFloat(a) / parseFloat(b);
        break;
      default:
        return;
    }
    return result.toString();
  };

  const handleButtonClick = (e) => {
    const value = e.target.innerText;
    const key = e.target.id;

    switch (key) {
      case "clear":
        setDisplay("");
        setResult("0");
        setOperand1("");
        setOperand2("");
        setOperator("");
        break;
      case "decimal":
        if (operator) {
          if (!operand2.includes(".")) {
            setOperand2(operand2 + value);
            setDisplay(display + value);
          }
        } else {
          if (!operand1.includes(".")) {
            setOperand1(operand1 + value);
            setDisplay(display + value);
          }
        }
        break;
      case "number":
      case "zero":
        if (operator) {
          setOperand2(operand2 + value);
          setDisplay(display + value);
        } else {
          setOperand1(operand1 + value);
          setDisplay(display + value);
        }
        break;
      case "operator":
        if(!operand1 && !operand2 && !operator) {
            if(value === "-") {
              setOperand1(value);
              setDisplay(display + value);
            }
        }
        if (operand1 && !operand2 && !operator ) {
          setOperator(value);
          setDisplay(display + value);;
        }
        break;
      case "equals":
        if (operand1 && operand2 && operator) {
          const result = calculate(operand1, operand2, operator);
          setResult(result);
          setDisplay(result);
          setOperand1(result);
          setOperand2("");
          setOperator("");
        }
        else if (operand1 && operator) {
          setDisplay(operand1);
          setResult(operand1);
          setOperator("");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-4 grid-rows-5 gap-0.5 bg-black p-2 w-80">
      {buttonData.map((button) => (
        <button
          onClick={handleButtonClick}
          id={button.key}
          key={button.value}
          className={`text-white p-3 hover:outline hover:outline-white ${buttonClasses[button.key]}`}
        >
          {button.value}
        </button>
      ))}
    </div>
  );
}