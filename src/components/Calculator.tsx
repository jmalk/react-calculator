import { useState } from "react";

type Operation = "add" | "subtract" | "multiply" | "divide";

function NumberButton({
  handler,
  n,
}: {
  handler: (n: number) => void;
  n: number;
}) {
  return (
    <button className="button" onClick={() => handler(n)}>
      {n}
    </button>
  );
}

function OperationButton({
  handler,
  symbol,
}: {
  handler: () => void;
  symbol: string;
}) {
  return (
    <button className="button" onClick={handler}>
      {symbol}
    </button>
  );
}

function Calculator() {
  const [value, setValue] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [waiting, setWaiting] = useState(false);

  const handleAC = () => {
    setValue(0);
    setPrevious(0);
    setOperation(null);
    setWaiting(false);
  };

  const handleDelete = () => {
    setValue(Math.floor(value / 10));
  };

  const handleNumber = (n: number) => {
    if (waiting) {
      setWaiting(false);
      setPrevious(value);
      setValue(n);
    } else {
      setValue(value * 10 + n);
    }
  };

  const handleOperation = (operation: Operation) => {
    setOperation(operation);
    setWaiting(true);
  };

  const handleEquals = () => {
    if (operation === "add") {
      setValue(previous + value);
    }
    if (operation === "subtract") {
      setValue(previous - value);
    }
    if (operation === "multiply") {
      setValue(previous * value);
    }
    if (operation === "divide") {
      setValue(previous / value);
    }
    setOperation(null);
  };

  return (
    <div className="calculator">
      <div className="display">
        <span className="value">{value}</span>
      </div>

      <div className="row">
        <button className="button width-2" onClick={handleAC}>
          AC
        </button>
        <button className="button" onClick={handleDelete}>
          ←
        </button>
        <OperationButton handler={() => handleOperation("divide")} symbol="/" />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n={7} />
        <NumberButton handler={handleNumber} n={8} />
        <NumberButton handler={handleNumber} n={9} />
        <OperationButton
          handler={() => handleOperation("multiply")}
          symbol="X"
        />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n={4} />
        <NumberButton handler={handleNumber} n={5} />
        <NumberButton handler={handleNumber} n={6} />
        <OperationButton
          handler={() => handleOperation("subtract")}
          symbol="–"
        />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n={1} />
        <NumberButton handler={handleNumber} n={2} />
        <NumberButton handler={handleNumber} n={3} />
        <OperationButton handler={() => handleOperation("add")} symbol="+" />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n={0} />
        <button className="equals button width-3" onClick={handleEquals}>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
