/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Digit, Target } from '../App';

const SearchContext = createContext<{
  target: Target;
  setTarget: Dispatch<SetStateAction<Target>>;
  numDigits: Digit;
  setNumDigits: Dispatch<SetStateAction<Digit>>;
}>({
  target: '15',
  numDigits: '5',
  setTarget: () => {},
  setNumDigits: () => {},
});

type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [target, setTarget] = useState<Target>('15');
  const [numDigits, setNumDigits] = useState<Digit>('5');
  const value = useMemo(
    () => ({
      target,
      setTarget,
      numDigits,
      setNumDigits,
    }),
    [numDigits, target],
  );
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
