/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchContext } from './SearchContext';
import Combination from '../components/Combination';

const AnimationContext = createContext<{
  destination: HTMLElement | null;
  setDestination: Dispatch<SetStateAction<HTMLElement | null>>;
  isTabBarScrollable: boolean;
  setIsTabBarScrollable: Dispatch<SetStateAction<boolean>>;
  searchResultsRef: MutableRefObject<HTMLDivElement | null>;
  tabsRef: MutableRefObject<Record<string, HTMLButtonElement | null>>;
}>({
  destination: null,
  setDestination: () => {},
  isTabBarScrollable: false,
  setIsTabBarScrollable: () => {},
  searchResultsRef: { current: null },
  tabsRef: { current: {} },
});

type AnimationProviderProps = {
  children: ReactNode;
};
const startScale = 1;
const endScale = 0.1;

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  const [destination, setDestination] = useState<HTMLElement | null>(null);
  const [isTabBarScrollable, setIsTabBarScrollable] = useState(false);
  const { results } = useSearchContext();

  const [transform, setTransform] = useState<{ transform: string } | undefined>(
    undefined,
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const searchResultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!destination || !searchResultsRef.current) return;

    const searchResultsDimensions =
      searchResultsRef.current?.getBoundingClientRect();

    const searchResultsCenterX =
      searchResultsDimensions.left + searchResultsDimensions.width / 2;
    const searchResultsCenterY =
      searchResultsDimensions.top + searchResultsDimensions.height / 2;

    const destinationDimensions = destination.getBoundingClientRect();
    const destinationCenterX =
      destinationDimensions.left + destinationDimensions.width / 2;
    const destinationCenterY =
      destinationDimensions.top + destinationDimensions.height / 2;

    setTransform({
      transform: `translateX(${searchResultsCenterX}px) translateY(${searchResultsCenterY}px) scale(${startScale})`,
    });
    setIsAnimating(true);

    requestAnimationFrame(() => {
      setTransform({
        transform: `translateX(${destinationCenterX}px) translateY(${destinationCenterY}px) scale(${endScale})`,
      });
      setTimeout(() => {
        setIsAnimating(false);
        setDestination(null);
      }, 300);
    });
  }, [destination]);

  const value = useMemo(
    () => ({
      destination,
      setDestination,
      isTabBarScrollable,
      setIsTabBarScrollable,
      searchResultsRef,
      tabsRef,
    }),
    [destination, isTabBarScrollable],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
      {isAnimating ? (
        <div
          className="fixed top-0 left-0 transition-transform ease-in duration-300 origin-top-left"
          style={transform}
        >
          <div className="opacity-50 font-mono p-4 md:p-8 bg-white bg-opacity-5 -translate-x-1/2 -translate-y-1/2">
            {results.map((combination, idx) => (
              <Combination key={idx} combination={combination} />
            ))}
          </div>
        </div>
      ) : null}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = () => useContext(AnimationContext);
