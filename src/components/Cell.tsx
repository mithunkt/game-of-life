import React from "react";
import * as Types from "../types";

const Cell = ({ onClick, id, isLive }: Types.ICell) => (
  <div
    className={isLive ? `cell live` : `cell`}
    id={id}
    key={id}
    onClick={onClick}
  ></div>
);

export default Cell;
