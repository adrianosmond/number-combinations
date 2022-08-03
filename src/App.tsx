import { useMemo, useState } from 'react';

const fortyFive = new Array(45).fill(1).map((_, i) => i + 1);
const nine = new Array(9).fill(1).map((_, i) => i + 1);

const makeCombinations = (
  allCombinations: number[][],
  target: number,
  numElements: number,
  current: number[] = [],
  currentSum = 0,
  start = 0,
): void => {
  for (let x = start + 1; x <= 9; x += 1) {
    if (currentSum + x > target) return;
    const arr = [...current, x];
    if (arr.length === numElements && currentSum + x === target) {
      allCombinations.push(arr);
    } else if (arr.length < numElements) {
      makeCombinations(
        allCombinations,
        target,
        numElements,
        arr,
        currentSum + x,
        x,
      );
    }
  }
};

const App = () => {
  const [target, setTarget] = useState(15);
  const [numDigits, setNumDigits] = useState(5);

  const combinations = useMemo(() => {
    const combis: number[][] = [];
    makeCombinations(combis, target, numDigits);
    return combis;
  }, [target, numDigits]);

  return (
    <>
      <h1 className="text-5xl font-bold">Number combinations</h1>
      <div className="my-4">
        Make{' '}
        <select
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value, 10))}
          className="border-0 border-b-2 border-yellow-400 p-2 bg-transparent outline-none"
        >
          {fortyFive.map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </select>
        from{' '}
        <select
          value={numDigits}
          onChange={(e) => setNumDigits(parseInt(e.target.value, 10))}
          className="border-0 border-b-2 border-yellow-400 p-2 bg-transparent outline-none"
        >
          {nine.map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </select>{' '}
        digits
      </div>
      <div className="font-mono mt-8">
        {combinations.map((combination) => (
          <div>{combination.join(', ')}</div>
        ))}
      </div>
    </>
  );
};

export default App;
