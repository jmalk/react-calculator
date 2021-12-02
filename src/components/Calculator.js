import { useState } from "react";

const Operators = {
  PLUS: "PLUS",
  MINUS: "MINUS",
  MULTIPLY: "MULTIPLY",
  EQUALS: "EQUALS",
};

function NumberButton({ handler, n }) {
  return (
    <button className="button" onClick={() => handler(n)}>
      {n}
    </button>
  );
}

function Calculator() {
  const [value, setValue] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [operation, setOperation] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const handleAC = () => {
    setValue(0);
    setPrevious(0);
    setOperation(null);
    setWaiting(false);
  };

  const handleNumber = (n) => {
    if (waiting) {
      setWaiting(false);
      setPrevious(value);
      setValue(n);
    } else {
      setValue(value * 10 + n);
    }
  };

  const handleOperation = (operation) => {
    setOperation(operation);
    setWaiting(true);
  };

  const handleEquals = () => {
    if (operation === Operators.PLUS) {
      setValue(previous + value);
    }
    if (operation === Operators.MINUS) {
      setValue(previous - value);
    }
    if (operation === Operators.MULTIPLY) {
      setValue(previous * value);
    }
    setOperation(null);
  };

  return (
    <div className="calculator">
      <div className="display">
        <span className="value">{value}</span>
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n={7} />
        <NumberButton handler={handleNumber} n={8} />
        <NumberButton handler={handleNumber} n={9} />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n={4} />
        <NumberButton handler={handleNumber} n={5} />
        <NumberButton handler={handleNumber} n={6} />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n={1} />
        <NumberButton handler={handleNumber} n={2} />
        <NumberButton handler={handleNumber} n={3} />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n={0} />
        <button
          className="button"
          onClick={() => handleOperation(Operators.PLUS)}
        >
          +
        </button>
        <button
          className="button"
          onClick={() => handleOperation(Operators.MINUS)}
        >
          -
        </button>
      </div>

      <div className="row">
        <button
          className="button"
          onClick={() => handleOperation(Operators.MULTIPLY)}
        >
          X
        </button>
        <button className="button" onClick={handleAC}>
          AC
        </button>
        <button className="equals button" onClick={handleEquals}>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;