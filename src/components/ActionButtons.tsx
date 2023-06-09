import { Dispatch, SetStateAction } from 'react';
import { useAnimationContext } from '../contexts/AnimationContext';
import { useSavedDataContext } from '../contexts/SavedDataContext';
import { useSearchContext } from '../contexts/SearchContext';
import { SELECT_TARGET_KEY } from './Tabs';

type ActionButtonsProps = {
  isSearching: boolean;
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

const ActionButtons = ({ isSearching, setSelectedTab }: ActionButtonsProps) => {
  const { savedData, clearData } = useSavedDataContext();
  const { saveSearch } = useSearchContext();
  const { setDestination, tabsRef } = useAnimationContext();

  return (
    <div className="fixed bottom-8 md:bottom-2 right-2 flex flex-col gap-2">
      {isSearching && (
        <button
          onClick={() => {
            const newTabId = saveSearch();
            requestAnimationFrame(() => {
              setDestination(tabsRef.current[newTabId]);
            });
          }}
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
        <button
          onClick={() => {
            clearData();
            setSelectedTab(SELECT_TARGET_KEY);
          }}
        >
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
  );
};

export default ActionButtons;
