/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Combinations, SavedData } from '../App';

const STORAGE_KEY = '__SAVED_COMBINATIONS__';

const SavedDataContext = createContext<{
  savedData: SavedData;
  createItem: (name: string, id: string, combinations: Combinations) => void;
  removeItem: (itemId: string) => void;
  addCombinationsToItem: (itemId: string, combinations: Combinations) => void;
}>({
  savedData: [],
  createItem: () => {},
  removeItem: () => {},
  addCombinationsToItem: () => {},
});

type SavedDataProviderProps = {
  children: ReactNode;
};

export const SavedDataProvider = ({ children }: SavedDataProviderProps) => {
  let initialState: SavedData = [];
  try {
    initialState = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]',
    ) as SavedData;
  } catch {
    localStorage.setItem(STORAGE_KEY, '[]');
  }

  const [savedData, setSavedData] = useState<SavedData>(initialState);

  const createItem = useCallback(
    (name: string, id: string, combinations: Combinations) => {
      setSavedData((s) => [
        ...s,
        {
          name,
          id,
          state: combinations.map((c) => ({
            isHidden: false,
            combination: c,
          })),
        },
      ]);
    },
    [],
  );

  const removeItem = useCallback((itemId: string) => {
    setSavedData((s) => s.filter((item) => item.id !== itemId));
  }, []);

  const addCombinationsToItem = useCallback(
    (itemId: string, combinations: Combinations) => {
      setSavedData((s) =>
        s.map((item) =>
          item.id === itemId
            ? {
                ...item,
                state: [
                  ...item.state,
                  ...combinations.map((combination) => ({
                    isHidden: false,
                    combination,
                  })),
                ],
              }
            : item,
        ),
      );
    },
    [],
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
  }, [savedData]);

  const value = useMemo(
    () => ({ savedData, createItem, removeItem, addCombinationsToItem }),
    [savedData, createItem, removeItem, addCombinationsToItem],
  );

  return (
    <SavedDataContext.Provider value={value}>
      {children}
    </SavedDataContext.Provider>
  );
};

export const useSavedDataContext = () => useContext(SavedDataContext);
