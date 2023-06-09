import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { useSavedDataContext } from '../contexts/SavedDataContext';
import { useSearchContext } from '../contexts/SearchContext';
import { SELECT_TARGET_KEY } from './Tabs';
import { useAnimationContext } from '../contexts/AnimationContext';

type TabBarProps = {
  isSearching: boolean;
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

const TabBar = ({ isSearching, selectedTab, setSelectedTab }: TabBarProps) => {
  const { savedData, addCombinationsToItem, removeItem } =
    useSavedDataContext();
  const { results } = useSearchContext();
  const { setDestination, tabsRef } = useAnimationContext();

  return (
    <div
      className={classNames({
        'fixed bottom-0 left-0 right-0 py-2 px-6 lg:px-12 flex gap-4 overflow-x-auto bg-slate-800 bg-opacity-90 text-xs font-semibold transition-transform':
          true,
        'translate-y-full': savedData.length === 0,
        'translate-y-0': savedData.length > 0,
      })}
    >
      <button
        onClick={() => setSelectedTab(SELECT_TARGET_KEY)}
        className={classNames({
          'border-b-2': true,
          'border-transparent': !isSearching,
          'border-current': isSearching,
        })}
      >
        Search
      </button>
      {savedData.map((tab) => (
        <div className="flex gap-1 whitespace-nowrap" key={tab.id}>
          <button
            ref={(node) => {
              tabsRef.current[tab.id] = node;
            }}
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={classNames({
              'border-b-2': true,
              'border-transparent': selectedTab !== tab.id,
              'border-current': selectedTab === tab.id,
            })}
          >
            {tab.name}
          </button>
          {isSearching ? (
            <button
              onClick={() => {
                addCombinationsToItem(tab.id, results);
                requestAnimationFrame(() => {
                  setDestination(tabsRef.current[tab.id]);
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="w-4 h-4 fill-current"
              >
                <path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => {
                removeItem(tab.id);
                if (selectedTab === tab.id) {
                  setSelectedTab(SELECT_TARGET_KEY);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="w-4 h-4 fill-current"
              >
                <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabBar;
