import useCellState from "./useCellState";
import * as Types from "../types";
import { renderHook, act } from "@testing-library/react-hooks";

it("should return generated cell data", () => {
  const { result } = renderHook(() => useCellState());
  expect(result.current.cellData.length).toEqual(400);
});

it("should be able to select cells", () => {
  const { result } = renderHook(() => useCellState());
  act(() => {
    result.current.updateCellData("2", "select");
  });
  expect(result.current.cellData[2].isLive).toEqual(true);
});

it("should be able to reset cells", () => {
  const { result } = renderHook(() => useCellState());
  act(() => {
    result.current.updateCellData("2", "select");
    result.current.updateCellData("", "reset");
  });
  expect(result.current.cellData[2].isLive).toEqual(false);
});

describe("should be able to simulate next generation for given state following the rules", () => {
  it("should cell die if less than 2 neighbours", () => {
    const { result } = renderHook(() => useCellState());
    act(() => {
      result.current.updateCellData("2", "select");
      result.current.updateCellData("", "simulation");
      result.current.updateCellData("", "reset");
    });
    expect(result.current.cellData[2].isLive).toEqual(false);
  });

  it("should cell live if 2  or 3 neighbours", () => {
    const { result } = renderHook(() => useCellState());
    const cellSelectionIndex = [0, 1, 20, 21];
    let output: Types.ICellData;
    act(() => {
      result.current.setCellData(
        result.current.cellData?.map((cell) => {
          if (cellSelectionIndex.indexOf(cell.id) >= 0) {
            cell.isLive = true;
            return cell;
          }
          return cell;
        }) as Types.ICellData
      );
      output = result.current.getNextGeneration();
    });
    expect(output[0].isLive).toEqual(true);
    expect(output[1].isLive).toEqual(true);
    expect(output[20].isLive).toEqual(true);
    expect(output[21].isLive).toEqual(true);
  });

  it("should cell die if more than 3 neighbours", () => {
    const { result } = renderHook(() => useCellState());
    const cellSelectionIndex = [0, 1, 2, 20, 21, 22, 30, 31, 32];
    let output: Types.ICellData;
    act(() => {
      result.current.setCellData(
        result.current.cellData?.map((cell) => {
          if (cellSelectionIndex.indexOf(cell.id) >= 0) {
            cell.isLive = true;
            return cell;
          }
          return cell;
        }) as Types.ICellData
      );
      output = result.current.getNextGeneration();
    });
    expect(output[21].isLive).toEqual(false);
  });
});
