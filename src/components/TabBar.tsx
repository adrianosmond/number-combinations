import classNames from 'classnames';
import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { useSavedDataContext } from '../contexts/SavedDataContext';
import { useSearchContext } from '../contexts/SearchContext';
import { SELECT_TARGET_KEY } from './Tabs';
import { useAnimationContext } from '../contexts/AnimationContext';
import EditableName from './EditableName';

type TabBarProps = {
  isSearching: boolean;
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

const TabBar = ({ isSearching, selectedTab, setSelectedTab }: TabBarProps) => {
  const {
    savedData,
    canAddCombinationsToItem,
    addCombinationsToItem,
    removeItem,
    renameItem,
    transitionItem,
  } = useSavedDataContext();
  const { results } = useSearchContext();
  const { setDestination, tabsRef } = useAnimationContext();
  const transitioningTab = savedData.find((tab) => tab.isTransitioning);

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
        <div
          className={classNames({
            'flex gap-1 whitespace-nowrap duration-300': true,
            'translate-y-10': tab.isTransitioning,
            'translate-y-0': !tab.isTransitioning,
            'transition-none':
              transitioningTab && transitioningTab.id !== tab.id,
          })}
          key={tab.id}
          style={
            transitioningTab && transitioningTab.id !== tab.id
              ? ({
                  '--tw-translate-x':
                    transitioningTab.name.length === 8 ? `-4.8rem` : '-5.5rem',
                } as CSSProperties)
              : {}
          }
        >
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
            {selectedTab === tab.id ? (
              <EditableName
                name={tab.name}
                saveName={(newName: string) => renameItem(tab.id, newName)}
              />
            ) : (
              tab.name
            )}
          </button>
          {isSearching ? (
            <button
              disabled={!canAddCombinationsToItem(tab.id, results)}
              onClick={() => {
                addCombinationsToItem(tab.id, results);
                requestAnimationFrame(() => {
                  setDestination(tabsRef.current[tab.id]);
                });
              }}
              className="disabled:opacity-50"
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
                transitionItem(tab.id);
                if (selectedTab === tab.id) {
                  setSelectedTab(SELECT_TARGET_KEY);
                }
                setTimeout(() => {
                  removeItem(tab.id);
                }, 300);
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
