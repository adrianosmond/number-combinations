/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

const UIContext = createContext<{
  saveSearchAnimationDestination: HTMLElement | null;
  setSaveSearchAnimationDestination: Dispatch<
    SetStateAction<HTMLElement | null>
  >;
  isTabBarScrollable: boolean;
  setIsTabBarScrollable: Dispatch<SetStateAction<boolean>>;
  tabsRef: MutableRefObject<Record<string, HTMLButtonElement | null>>;
}>({
  saveSearchAnimationDestination: null,
  setSaveSearchAnimationDestination: () => {},
  isTabBarScrollable: false,
  setIsTabBarScrollable: () => {},
  tabsRef: { current: {} },
});

type UIProviderProps = {
  children: ReactNode;
};

export const UIProvider = ({ children }: UIProviderProps) => {
  const [saveSearchAnimationDestination, setSaveSearchAnimationDestination] =
    useState<HTMLElement | null>(null);
  const [isTabBarScrollable, setIsTabBarScrollable] = useState(false);
  const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({});

  const value = useMemo(
    () => ({
      saveSearchAnimationDestination,
      setSaveSearchAnimationDestination,
      isTabBarScrollable,
      setIsTabBarScrollable,
      tabsRef,
    }),
    [saveSearchAnimationDestination, isTabBarScrollable],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUIContext = () => useContext(UIContext);
