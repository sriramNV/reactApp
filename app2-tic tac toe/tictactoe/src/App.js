import { useReducer } from "react";

export default function App() {
  return (
    <div>
      <Game />
    </div>
  );
}

function generateGrid(rows, columns, mapper) {
  return Array(rows)
    .fill()
    .map(() => Array(columns).fill().map(mapper));
}

const newTicTacToeGrid = () => generateGrid(3, 3, () => null);

function Game() {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const { grid, status, turn } = state;

  const handleClick = (x, y) => {
    dispatch({ type: "CLICK", payload: { x, y } });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>Next up: {turn}</div>
        {}
        <div>{GAME_STATUS_TEXT[status](turn)}</div>
        <button onClick={reset} type="button">
          Reset
        </button>
      </div>
      {state.cell}
      <Grid cell={state.cell} grid={grid} handleClick={handleClick} />
    </div>
  );
}

function Grid({ cell, grid, handleClick }) {
  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          backgroundColor: "#000",
          display: "grid",

          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gridGap: 2,
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Cell
              key={`${colIdx}-${rowIdx}`}
              onClick={() => {
                handleClick(colIdx, rowIdx);
              }}
              cell={cell}
            />
          ))
        )}
      </div>
    </div>
  );
}

function Cell({ cell, handleClick, k }) {
  return (
    <div style={cellStyle}>
      <button
        style={{
          width: "100%",
          height: "100%",
        }}
        onClick={handleClick}
      >
        {console.log(k)}
        {cell}
      </button>
    </div>
  );
}

const cellStyle = {
  backgroundColor: "#fff",
  height: 175,
  width: 175,
};

const clone = (x) => JSON.parse(JSON.stringify(x));

const NEXT_TURN = {
  O: "X",
  X: "O",
};

const reducer = (state, action) => {
  if (state.status === "success" && action.type !== "RESET") {
    return state;
  }

  switch (action.type) {
    case "Reset":
      return getInitialState();

    case "CLICK": {
      const { x, y } = action.payload;
      const nextState = clone(state);
      const { grid, turn } = nextState;

      if (grid[y][x]) {
        return state;
      }

      grid[y][x] = turn;
      const flatGrid = flatten(grid);

      if (checkForWin(flatGrid)) {
        nextState.status = "success";
        return nextState;
      }

      if (checkforDraw(flatGrid)) {
        return getInitialState();
      }

      nextState.turn = NEXT_TURN[turn];
      return nextState;
    }
    default:
      return state;
  }
};

const getInitialState = () => ({
  grid: newTicTacToeGrid(),
  status: "inProgress",
  turn: "X",
});

const checkThree = (a, b, c) => {
  if (!a || !b || !c) return false;
  return a === b && b === c;
};

const flatten = (array) => array.reduce((acc, cur) => [...acc, ...cur], []);

function checkForWin(flatGrid) {
  const [nw, n, ne, w, c, e, sw, s, se] = flatGrid;

  return (
    checkThree(nw, n, ne) ||
    checkThree(w, c, e) ||
    checkThree(sw, s, se) ||
    checkThree(nw, w, sw) ||
    checkThree(n, c, s) ||
    checkThree(ne, e, se) ||
    checkThree(nw, c, se) ||
    checkThree(ne, c, nw)
  );
}

const GAME_STATUS_TEXT = {
  inProgress: () => null,
  success: (turn) => `${turn} won!!!`,
};

function checkforDraw(flatGrid) {
  return (
    !checkForWin(flatGrid) &&
    flatGrid.filter(Boolean).length === flatGrid.length
  );
}
