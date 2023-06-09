import { useState } from 'react';
import Search from './Search';
import ActionButtons from './ActionButtons';
import TabBar from './TabBar';
import TabContent from './TabContent';

export const SELECT_TARGET_KEY = 'select-target';

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState(SELECT_TARGET_KEY);
  const isSearching = selectedTab === SELECT_TARGET_KEY;

  return (
    <>
      {isSearching ? <Search /> : <TabContent id={selectedTab} />}
      <TabBar
        isSearching={isSearching}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <ActionButtons
        isSearching={isSearching}
        setSelectedTab={setSelectedTab}
      />
    </>
  );
};

export default Tabs;
