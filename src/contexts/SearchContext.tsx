/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import data from '../data.json';
import { useSavedDataContext } from './SavedDataContext';

export type Target = keyof typeof data;
export type Digit = keyof (typeof data)[Target];
export type SearchResults = number[][];

const SearchContext = createContext<{
  target: Target;
  setTarget: Dispatch<SetStateAction<Target>>;
  numDigits: Digit;
  setNumDigits: Dispatch<SetStateAction<Digit>>;
  results: SearchResults;
  saveSearch: () => void;
}>({
  target: '15',
  numDigits: '5',
  setTarget: () => {},
  setNumDigits: () => {},
  results: [],
  saveSearch: () => {},
});

type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [target, setTarget] = useState<Target>('15');
  const [numDigits, setNumDigits] = useState<Digit>('5');
  const results = useMemo(() => data[target][numDigits], [numDigits, target]);
  const { createItem } = useSavedDataContext();
  const saveSearch = useCallback(
    () => createItem(`${target} from ${numDigits}`, results),
    [createItem, numDigits, results, target],
  );
  const value = useMemo(
    () => ({
      target,
      setTarget,
      numDigits,
      setNumDigits,
      results,
      saveSearch,
    }),
    [target, numDigits, results, saveSearch],
  );
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
