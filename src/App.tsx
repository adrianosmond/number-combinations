import Tabs from './components/Tabs';
import { SearchProvider } from './contexts/SearchContext';
import { SavedDataProvider } from './contexts/SavedDataContext';
import { AnimationProvider } from './contexts/AnimationContext';

const App = () => (
  <SavedDataProvider>
    <SearchProvider>
      <AnimationProvider>
        <h1 className="text-3xl md:text-5xl font-bold mx-auto">
          Number <br className="lg:hidden" /> combinations
        </h1>
        <Tabs />
      </AnimationProvider>
    </SearchProvider>
  </SavedDataProvider>
);

export default App;
