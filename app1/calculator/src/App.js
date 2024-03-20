import { useReducer } from "react";
import "./styles.css";

const Action = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clead",
  DELETE_DIGIT: "delete-digit",
  EVALUAT: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Action.ADD_DIGIT:
      return {
        ...state,
        currentOp: `${currentOp}|| ""${payload.digit}`,
      };
    default:
      return null;
  }
}

function App() {
  const [{ currentOp, previousOp, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  dispatch({ type: Action.ADD_DIGIT, payload: { digit: 1 } });

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOp} {operation}
        </div>
        <div className="current-operand">{currentOp}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>/</button>
      <button>9</button>
      <button>8</button>
      <button>7</button>
      <button>*</button>
      <button>6</button>
      <button>5</button>
      <button>4</button>
      <button>+</button>
      <button>3</button>
      <button>2</button>
      <button>1</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
