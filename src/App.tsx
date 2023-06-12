import Tabs from './components/Tabs';
import { SearchProvider } from './contexts/SearchContext';
import { SavedDataProvider } from './contexts/SavedDataContext';
import { UIProvider } from './contexts/UIContext';

const App = () => (
  <SavedDataProvider>
    <SearchProvider>
      <UIProvider>
        <h1 className="text-3xl md:text-5xl font-bold mx-auto">
          Number <br className="lg:hidden" /> combinations
        </h1>
        <Tabs />
      </UIProvider>
    </SearchProvider>
  </SavedDataProvider>
);

export default App;
