import cn from 'classnames';
import React, {
  memo,
  useMemo,
  Children,
  Dispatch,
  useCallback,
  cloneElement,
  isValidElement,
  PropsWithChildren, useEffect
} from 'react'


import { TabWidgetContext, ITabWidgetContext, defaultTabContext, ITabWidgetContextState } from './TabWidget.context';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

interface ITabWidgetProps {
  active?: string,
  className?: string;
  onTabChange?: Dispatch<ITabWidgetContextState>,
}

export const TabWidget = memo<PropsWithChildren<ITabWidgetProps>>(function TabWidget ({ active, className, children, onTabChange}) {
  const [tabState, setTabState] = useStateWithCallbackLazy<ITabWidgetContext>(defaultTabContext)

  const handleTabChange = useCallback((data: ITabWidgetContextState) => {
    onTabChange && onTabChange({...data})
  }, [onTabChange])

  const tabWidgetContextValue = useMemo(
    () => ({
      ...tabState, setTabState, triggerTabChange: (data: ITabWidgetContextState) => handleTabChange(data)
    }),
    [tabState, setTabState, handleTabChange],
  );

  useEffect(() => {
    if (tabState.state.activeTab !== active) {
      setTabState((prev) => ({...prev, state: { ...prev.state, activeTab: active } }), () => null)
    }
  }, [active, setTabState, tabState.state.activeTab])

  return (<>
    <TabWidgetContext.Provider value={tabWidgetContextValue}>
      <div className={cn('tab-widget', className)}>
        { Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return child;
          }
          return cloneElement(child, {});
        })}
      </div>
    </TabWidgetContext.Provider>
  </>);
});
