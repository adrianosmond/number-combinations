import { useEffect, useState } from 'react';
import Combination from './Combination';
import { useUIContext } from '../contexts/UIContext';
import { SearchResults } from '../contexts/SearchContext';

type SearchAnimationProps = {
  results: SearchResults;
  searchResultsRef: React.MutableRefObject<HTMLDivElement | null>;
};

const START_SCALE = 1;
const END_SCALE = 0.1;

const SearchAnimation = ({
  results,
  searchResultsRef,
}: SearchAnimationProps) => {
  const { saveSearchAnimationDestination, setSaveSearchAnimationDestination } =
    useUIContext();
  const [transform, setTransform] = useState<{ transform: string } | undefined>(
    undefined,
  );
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!saveSearchAnimationDestination || !searchResultsRef.current) return;

    const searchResultsDimensions =
      searchResultsRef.current?.getBoundingClientRect();

    const searchResultsCenterX =
      searchResultsDimensions.left + searchResultsDimensions.width / 2;
    const searchResultsCenterY =
      searchResultsDimensions.top + searchResultsDimensions.height / 2;

    const destinationDimensions =
      saveSearchAnimationDestination.getBoundingClientRect();
    const destinationCenterX =
      destinationDimensions.left + destinationDimensions.width / 2;
    const destinationCenterY =
      destinationDimensions.top + destinationDimensions.height / 2;

    setTransform({
      transform: `translateX(${searchResultsCenterX}px) translateY(${searchResultsCenterY}px) scale(${START_SCALE})`,
    });
    setIsAnimating(true);

    requestAnimationFrame(() => {
      setTransform({
        transform: `translateX(${destinationCenterX}px) translateY(${destinationCenterY}px) scale(${END_SCALE})`,
      });
      setTimeout(() => {
        setIsAnimating(false);
        setSaveSearchAnimationDestination(null);
      }, 300);
    });
  }, [
    saveSearchAnimationDestination,
    setSaveSearchAnimationDestination,
    searchResultsRef,
  ]);

  if (!isAnimating) return null;

  return (
    <div
      className="fixed top-0 left-0 transition-transform ease-in duration-300 origin-top-left z-10"
      style={transform}
    >
      <div className="opacity-50 font-mono p-4 md:p-8 bg-white bg-opacity-5 -translate-x-1/2 -translate-y-1/2">
        {results.map((combination, idx) => (
          <Combination key={idx} combination={combination} />
        ))}
      </div>
    </div>
  );
};

export default SearchAnimation;
