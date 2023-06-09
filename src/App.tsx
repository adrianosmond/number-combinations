import Tabs from './components/Tabs';
import { SearchProvider } from './contexts/SearchContext';
import { SavedDataProvider } from './contexts/SavedDataContext';

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
