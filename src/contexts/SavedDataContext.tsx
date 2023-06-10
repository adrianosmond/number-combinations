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
import { SearchResults } from './SearchContext';

export type FilteredCombinations = {
  isHidden: boolean;
  combination: number[];
};
export type Item = {
  name: string;
  id: string;
  state: FilteredCombinations[];
};
export type SavedData = Item[];

const STORAGE_KEY = '__SAVED_COMBINATIONS__';

const createId = () => Math.random().toString(36).substring(2);

const SavedDataContext = createContext<{
  savedData: SavedData;
  createItem: (name: string, combinations: SearchResults) => string;
  removeItem: (itemId: string) => void;
  renameItem: (itemId: string, newName: string) => void;
  addCombinationsToItem: (itemId: string, combinations: SearchResults) => void;
  hideCombination: (itemId: string, combinationKey: string) => void;
  showAll: (itemId: string) => void;
  clearData: () => void;
}>({
  savedData: [],
  createItem: () => '',
  removeItem: () => {},
  renameItem: () => {},
  addCombinationsToItem: () => {},
  hideCombination: () => {},
  showAll: () => {},
  clearData: () => {},
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
    (name: string, combinations: SearchResults) => {
      const id = createId();
      setSavedData((s) => [
        {
          name,
          id,
          state: combinations.map((c) => ({
            isHidden: false,
            combination: c,
          })),
        },
        ...s,
      ]);
      return id;
    },
    [],
  );

  const removeItem = useCallback((itemId: string) => {
    setSavedData((s) => s.filter((item) => item.id !== itemId));
  }, []);

  const renameItem = useCallback((itemId: string, newName: string) => {
    setSavedData((s) =>
      s.map((item) =>
        item.id === itemId
          ? {
              ...item,
              name: newName,
            }
          : item,
      ),
    );
  }, []);

  const addCombinationsToItem = useCallback(
    (itemId: string, combinations: SearchResults) => {
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

  const hideCombination = useCallback(
    (itemId: string, combinationKey: string) => {
      setSavedData((s) =>
        s.map((item) =>
          item.id === itemId
            ? {
                ...item,
                state: item.state.map((state) =>
                  state.combination.join(',') !== combinationKey
                    ? state
                    : {
                        isHidden: true,
                        combination: state.combination,
                      },
                ),
              }
            : item,
        ),
      );
    },
    [],
  );

  const showAll = useCallback((itemId: string) => {
    setSavedData((s) =>
      s.map((item) =>
        item.id === itemId
          ? {
              ...item,
              state: item.state.map((state) => ({
                isHidden: false,
                combination: state.combination,
              })),
            }
          : item,
      ),
    );
  }, []);

  const clearData = useCallback(() => {
    setSavedData(() => []);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
  }, [savedData]);

  const value = useMemo(
    () => ({
      savedData,
      createItem,
      removeItem,
      renameItem,
      addCombinationsToItem,
      hideCombination,
      showAll,
      clearData,
    }),
    [
      savedData,
      createItem,
      removeItem,
      renameItem,
      addCombinationsToItem,
      hideCombination,
      showAll,
      clearData,
    ],
  );

  return (
    <SavedDataContext.Provider value={value}>
      {children}
    </SavedDataContext.Provider>
  );
};

export const useSavedDataContext = () => useContext(SavedDataContext);
