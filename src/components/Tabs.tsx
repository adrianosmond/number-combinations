import { useState } from 'react';
import classNames from 'classnames';
import Combination from './Combination';
import Search from './Search';
import data from '../data.json';
import { useSearchContext } from '../contexts/SearchContext';
import { useSavedDataContext } from '../contexts/SavedDataContext';

const clear = () => {
  localStorage.clear();
  window.location.reload();
};

const SELECT_TARGET_KEY = 'select-target';

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState(SELECT_TARGET_KEY);
  const { savedData, createItem, removeItem, addCombinationsToItem } =
    useSavedDataContext();
  const { target, numDigits } = useSearchContext();
  const dataFromSearch = data[target][numDigits];

  return (
    <>
      <div>
        {selectedTab === SELECT_TARGET_KEY ? (
          <Search />
        ) : (
          <div className="my-6 md:my-8 font-mono p-4 md:p-8 bg-white bg-opacity-5">
            {savedData
              .find((d) => d.id === selectedTab)
              ?.state.map(({ combination, isHidden }, idx) => (
                <Combination
                  key={idx}
                  combination={combination}
                  isHidden={isHidden}
                />
              ))}
          </div>
        )}
      </div>
      {savedData.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 py-2 px-6 lg:px-12 flex gap-4 overflow-x-auto bg-slate-800 bg-opacity-90 text-xs font-semibold">
          <button
            onClick={() => setSelectedTab(SELECT_TARGET_KEY)}
            className={classNames({
              'border-b-2': true,
              'border-transparent': selectedTab !== SELECT_TARGET_KEY,
              'border-current': selectedTab === SELECT_TARGET_KEY,
            })}
          >
            Search
          </button>
          {savedData.map((tab) => (
            <div className="flex gap-1 whitespace-nowrap">
              <button
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
              {selectedTab === SELECT_TARGET_KEY ? (
                <button
                  onClick={() => {
                    addCombinationsToItem(tab.id, dataFromSearch);
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
      )}
      <div className="fixed bottom-8 md:bottom-2 right-2 flex flex-col gap-2">
        {selectedTab === SELECT_TARGET_KEY && (
          <button
            onClick={() =>
              createItem(
                `${target} in ${numDigits}`,
                `${new Date().getTime()}`,
                dataFromSearch,
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-6 h-6 fill-current"
            >
              <path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Zm60-91 220-93 220 93v-574H260v574Zm0-574h440-440Z" />
            </svg>
          </button>
        )}
        {savedData.length > 0 && (
          <button onClick={clear}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-6 h-6 fill-current"
            >
              <path d="m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570Zm-438 0v570-570Z" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default Tabs;
