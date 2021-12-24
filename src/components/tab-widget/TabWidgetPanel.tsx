import cn from 'classnames';
import React, {
  memo,
  useMemo,
  Children,
  ReactNode,
  cloneElement,
  isValidElement
} from 'react'

import { useTabWidgetContext } from './TabWidget.context';

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

  const { state: { activeTab } } = useTabWidgetContext();

  const isActive = useMemo(
    () => {
      return activeTab === `tab_${section}`
    },
    [activeTab, section]
  )

  return (<>
    <div id={`#tab_${section}`}
         className={cn('tab-widget__content-pane', className, {
           'active': isActive
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
