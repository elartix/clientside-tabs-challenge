import cn from 'classnames';
import React, {
  memo,
  useMemo,
  Children,
  ReactNode,
  useContext,
  cloneElement,
  isValidElement
} from 'react'

import { ITabWidgetContext, TabWidgetContext } from './TabWidget.context';

export interface ITabWidgetPanelProps {
  section: string;
  className?: string;
  children?: ReactNode | undefined
}

export const TabWidgetPanel = memo<ITabWidgetPanelProps>(function TabWidgetPanel ({
  section,
  className,
  children
}) {
  const { state: { activeTab, isLoading} } = useContext(TabWidgetContext) as ITabWidgetContext;

  const isActive = useMemo(
    () => {
      return activeTab === `tab_${section}`
    },
    [activeTab, section]
  )

  return (<>
    <div id={`#tab_${section}`}
         className={cn('tab-widget__content-pane', className, {
           'active': isActive,
           'loading': isLoading
         })}
    >
      { Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }
        return cloneElement(child, {});
      })}
    </div>
  </>);
});
