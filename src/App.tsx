import data from './data.json';
import Tabs from './components/Tabs';
import { SearchProvider } from './contexts/SearchContext';
import { SavedDataProvider } from './contexts/SavedDataContext';

export type Target = keyof typeof data;
export type Digit = keyof typeof data[Target];
export type Combinations = number[][];
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

const App = () => (
  <SavedDataProvider>
    <SearchProvider>
      <h1 className="text-3xl md:text-5xl font-bold mx-auto">
        Number <br className="lg:hidden" /> combinations
      </h1>
      <Tabs />
    </SearchProvider>
  </SavedDataProvider>
);

export default App;
