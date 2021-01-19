import React, { MouseEvent } from "react";
import Cell from "./components/Cell";
import useCellState from "./hooks/useCellState";
import "./App.css";

const App = () => {
  const { cellData, updateCellData, isRunning, generation } = useCellState();

  const cellClickHandler = (event: MouseEvent) => {
    const cellId = event.currentTarget.id;
    updateCellData(cellId, "select");
  };

  const resetHandler = () => updateCellData("", "reset");

  const simulateHandler = () => updateCellData("", "simulation");

  return (
    <div className="app">
      <header className="app-header">Cell Simulator</header>
      <section>
        <div className="controls">
          <button
            className="btn btn-primary"
            onClick={simulateHandler}
            disabled={isRunning}
          >
            Start
          </button>
          <button className="btn btn-red" onClick={resetHandler}>
            {isRunning ? "Stop" : "Reset"}
          </button>
        </div>
        <div className="cell-container">
          {cellData &&
            cellData.map((item, index) => (
              <Cell {...item} onClick={cellClickHandler} key={index} />
            ))}
        </div>
        <div className="generation">Generation : {generation}</div>
      </section>
    </div>
  );
};

export default App;
