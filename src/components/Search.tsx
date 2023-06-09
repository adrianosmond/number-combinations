import Combination from './Combination';
import {
  type Digit,
  type Target,
  useSearchContext,
} from '../contexts/SearchContext';

const fortyFive: Target[] = new Array(45)
  .fill(1)
  .map((_, i) => `${i + 1}` as Target);

const nine: Digit[] = new Array(9).fill(1).map((_, i) => `${i + 1}` as Digit);

const Search = () => {
  const { target, setTarget, numDigits, setNumDigits, results } =
    useSearchContext();

  return (
    <>
      <div className="my-6 md:my-8">
        Make{' '}
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value as Target)}
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
          onChange={(e) => setNumDigits(e.target.value as Digit)}
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
      <div className="font-mono p-4 md:p-8 bg-white bg-opacity-5">
        {results.map((combination, idx) => (
          <Combination key={idx} combination={combination} />
        ))}
      </div>
    </>
  );
};

export default Search;
