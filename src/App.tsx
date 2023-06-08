import { useState } from 'react';
import data from './data.json';

type target = keyof typeof data;
type digit = keyof typeof data[target];

const fortyFive: target[] = new Array(45)
  .fill(1)
  .map((_, i) => `${i + 1}` as target);

const nine: digit[] = new Array(9).fill(1).map((_, i) => `${i + 1}` as digit);

const App = () => {
  const [target, setTarget] = useState<target>('15');
  const [numDigits, setNumDigits] = useState<digit>('5');

  const combinations: number[][] = data[target][numDigits];

  return (
    <>
      <h1 className="text-3xl md:text-5xl font-bold mx-auto">
        Number <br className="lg:hidden" /> combinations
      </h1>
      <div className="my-6 md:my-8">
        Make{' '}
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value as target)}
          className="border-0 border-b-2 rounded-none border-yellow-400 p-2 pt-0 bg-transparent outline-none appearance-none font-mono font-bold"
        >
          {fortyFive.map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </select>{' '}
        from{' '}
        <select
          value={numDigits}
          onChange={(e) => setNumDigits(e.target.value as digit)}
          className="border-0 border-b-2 rounded-none border-yellow-400 p-2 pt-0 bg-transparent outline-none appearance-none font-mono font-bold"
        >
          {nine.map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </select>{' '}
        digits
      </div>
      <div className="font-mono p-4 md:p-8 bg-white bg-transparent bg-opacity-5">
        {combinations.map((combination, idx) => (
          <div key={idx}>{combination.join(', ')}</div>
        ))}
      </div>
    </>
  );
};

export default App;
