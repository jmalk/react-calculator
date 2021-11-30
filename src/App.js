import { useState } from "react";

const Operators = {
  PLUS: "PLUS",
  MINUS: "MINUS",
  EQUALS: "EQUALS",
};

const Calculator = () => {
  let state = {
    value: 0,
    previous: 0,
    operation: null,
    waiting: false,
  };
  return {
    press: (input) => {
      if (typeof input === "number") {
        if (state.waiting) {
          state.waiting = false;
          state.previous = state.value;
          state.value = input;
        } else {
          state.value = state.value * 10 + input;
        }
      }

      if (input === Operators.PLUS) {
        state.operation = Operators.PLUS;
        state.waiting = true;
      }

      if (input === Operators.MINUS) {
        state.operation = Operators.MINUS;
        state.waiting = true;
      }

      if (input === Operators.EQUALS) {
        if (state.operation === Operators.PLUS) {
          state.value = state.previous + state.value;
        }
        if (state.operation === Operators.MINUS) {
          state.value = state.previous - state.value;
        }
        state.operation = null;
      }
    },

    getDisplay: () => state.value,
  };
};

function NumberButton({ handler, n }) {
  return <button onClick={() => handler(n)}>{n}</button>;
}

function App() {
  const [value, setValue] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [operation, setOperation] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const handleNumber = (n) => {
    console.log(n);
    if (waiting) {
      setWaiting(false);
      setPrevious(value);
      setValue(n);
    } else {
      setValue(value * 10 + n);
    }
  };

  const handlePlus = () => {
    setOperation(Operators.PLUS);
    setWaiting(true);
  };

  const handleMinus = () => {
    setOperation(Operators.MINUS);
    setWaiting(true);
  };

  const handleEquals = () => {
    if (operation === Operators.PLUS) {
      setValue(previous + value);
    }
    if (operation === Operators.MINUS) {
      setValue(previous - value);
    }
    setOperation(null);
  };

  return (
    <div className="calculator">
      <div>
        <p>{value}</p>
      </div>
      <div className="row">
        <NumberButton handler={handleNumber} n={1} />
        <NumberButton handler={handleNumber} n={2} />
        <NumberButton handler={handleNumber} n={3} />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n={4} />
        <NumberButton handler={handleNumber} n={5} />
        <NumberButton handler={handleNumber} n={6} />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n={7} />
        <NumberButton handler={handleNumber} n={8} />
        <NumberButton handler={handleNumber} n={9} />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n={0} />
        <button onClick={handlePlus}>+</button>
        <button onClick={handleMinus}>-</button>
      </div>

      <div className="row">
        <button onClick={handleEquals}>=</button>
      </div>
    </div>
  );
}

export default App;
