import { useState } from "react";
import "./App.css";
import "./Home.css";
import useInterval from "./useInterval";

const N = 20;
const INTERVALS = 200;
const WEIGHT = 40;

const initGrid = () => {
  const matrix: Array<Array<Number>> = new Array<Array<Number>>();
  for (let i = 0; i < N; i++) {
    let row = new Array<Number>();
    for (let j = 0; j < N; j++) {
      let percentageCheck = Math.random() * 100;
      if (percentageCheck <= WEIGHT) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    matrix.push(row);
  }
  return matrix;
};
const Home: React.FC = () => {
  const [grid, setGrid] = useState<Array<Array<Number>>>(initGrid);
  const [isRunning, setRunning] = useState<boolean>(false);

  const cloneGrid = (): Array<Array<Number>> => {
    const arr = new Array<Array<Number>>();
    for (let i = 0; i < N; i++) {
      let row = new Array<Number>();
      for (let j = 0; j < N; j++) {
        row.push(grid[i][j]);
      }
      arr.push(row);
    }
    return arr;
  };

  useInterval(
    () => {
      // Your custom logic here
      const _grid = cloneGrid();
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (grid[i][j] === 0) {
            if (countNeighbor(i, j) === 3) {
              _grid[i][j] = 1;
            }
          } else if (grid[i][j] === 1) {
            if (countNeighbor(i, j) <= 1 || countNeighbor(i, j) >= 4) {
              _grid[i][j] = 0;
            }
          }
        }
      }
      setGrid(_grid);
    },
    // Delay in milliseconds or null to stop it
    isRunning ? INTERVALS : null
  );

  const resetGrid = () => {
    setGrid(initGrid);
  };

  const countNeighbor = (x: number, y: number) => {
    let count = 0;
    let arrX = [-1, 0, 1, 1, 1, 0, -1, -1];
    let arrY = [-1, -1, -1, 0, 1, 1, 1, 0];
    for (let i = 0; i < 8; i++) {
      if (
        x + arrX[i] >= 0 &&
        y + arrY[i] >= 0 &&
        x + arrX[i] < 8 &&
        y + arrY[i] < 8 &&
        grid[x + arrX[i]][y + arrY[i]] === 1
      ) {
        count++;
      }
    }
    return count;
  };

  const start = () => {
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
  };

  return (
    <div className="container">
      <button onClick={start}>play</button>
      <button onClick={pause}>pause</button>
      <button onClick={resetGrid}>reset</button>
      <table className="matrix">
        <tbody>
          {grid.map((row) => (
            <tr>
              {row.map((cell) => (
                <td className={`cell ${cell === 1 ? "black" : ""}`}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
