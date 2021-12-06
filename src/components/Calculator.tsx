import { useState } from "react";
import { Decimal } from "decimal.js-light";

type Operation = "add" | "subtract" | "multiply" | "divide";

const add = (a: string, b: string): string => {
  return new Decimal(a).plus(new Decimal(b)).toString();
};

const subtract = (a: string, b: string): string => {
  return new Decimal(a).minus(new Decimal(b)).toString();
};

const multiply = (a: string, b: string): string => {
  return new Decimal(a).mul(new Decimal(b)).toString();
};

const divide = (a: string, b: string): string => {
  return new Decimal(a).dividedBy(new Decimal(b)).toString();
};

const operations: Record<Operation, (a: string, b: string) => string> = {
  add,
  subtract,
  multiply,
  divide,
};

function NumberButton({
  handler,
  n,
}: {
  handler: (n: string) => void;
  n: string;
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
  const [value, setValue] = useState("");
  const [previous, setPrevious] = useState("0");
  const [operation, setOperation] = useState<Operation | null>(null);
  const [waiting, setWaiting] = useState(false);

  const handleAC = () => {
    setValue("0");
    setPrevious("0");
    setOperation(null);
    setWaiting(false);
  };

  const handleDelete = () => {
    setValue(value.slice(0, -1));
  };

  const handleNumber = (n: string) => {
    if (waiting) {
      setWaiting(false);
      setPrevious(value);
      setValue(n);
    } else {
      setValue(`${value}${n}`);
    }
  };

  const handleDecimal = () => {
    if (!value.includes(".")) {
      setValue(`${value}.`);
    }
  };

  const handleOperation = (operation: Operation) => {
    setOperation(operation);
    setWaiting(true);
  };

  const handleEquals = () => {
    if (operation) {
      setValue(operations[operation](previous, value));
    }
    setOperation(null);
    setWaiting(true);
  };

  return (
    <div className="calculator">
      <div className="display">
        <output className="value">{value}</output>
      </div>

      <div className="row">
        <button className="button width-2" onClick={handleAC}>
          AC
        </button>
        <button className="button" onClick={handleDelete}>
          ←
        </button>
        <OperationButton handler={() => handleOperation("divide")} symbol="÷" />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n="7" />
        <NumberButton handler={handleNumber} n="8" />
        <NumberButton handler={handleNumber} n="9" />
        <OperationButton
          handler={() => handleOperation("multiply")}
          symbol="×"
        />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n="4" />
        <NumberButton handler={handleNumber} n="5" />
        <NumberButton handler={handleNumber} n="6" />
        <OperationButton
          handler={() => handleOperation("subtract")}
          symbol="−"
        />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n="1" />
        <NumberButton handler={handleNumber} n="2" />
        <NumberButton handler={handleNumber} n="3" />
        <OperationButton handler={() => handleOperation("add")} symbol="+" />
      </div>

      <div className="row">
        <NumberButton handler={handleNumber} n="0" />
        <button className="button" onClick={handleDecimal}>
          .
        </button>
        <button className="equals button width-2" onClick={handleEquals}>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
