import { useSavedDataContext } from '../contexts/SavedDataContext';
import Combination from './Combination';

type TabContentProps = {
  id: string;
};

const TabContent = ({ id }: TabContentProps) => {
  const { savedData, hideCombination, showAll } = useSavedDataContext();
  const tabState = savedData.find((d) => d.id === id)?.state;

  if (!tabState) return null;

  return (
    <div className="my-6 md:my-8 font-mono p-4 md:p-8 bg-white bg-opacity-5 flex flex-col gap-8">
      <div>
        {tabState.map(({ combination, isHidden }, idx) => (
          <Combination
            key={idx}
            combination={combination}
            isHidden={isHidden}
            hide={() => hideCombination(id, combination.join(','))}
          />
        ))}
      </div>
      {tabState?.some((s) => s.isHidden) && (
        <button onClick={() => showAll(id)} className="font-sans">
          Show hidden items
        </button>
      )}
    </div>
  );
};

export default TabContent;
