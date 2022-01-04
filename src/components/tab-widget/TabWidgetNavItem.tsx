import cn from 'classnames';
import React, { memo, useCallback, useMemo, } from 'react'


import { ITabWidgetContext, useTabWidgetContext } from './TabWidget.context';


export interface ITabWidgetNavItem {
  id: string;
  label: string;
  className?: string;
  section?: string
}

export const TabWidgetNavItem = memo<ITabWidgetNavItem>(function TabWidgetNavItem ({
  id,
  label,
  className
}) {

  const { state: { activeTab }, setTabState, triggerTabChange } = useTabWidgetContext();

  const isActive = useMemo(
    () => {
      return activeTab === `tab_${id}`
    },
    [activeTab, id]
  )


  const handleTabItemClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      setTabState && setTabState((prevState) => {
        const newActiveId = `tab_${id}`;

        return {
          ...prevState,
          state: {
            ...prevState.state,
            section: id,
            activeTab: newActiveId
          }
        }
      }, (res: ITabWidgetContext) => {
        triggerTabChange && triggerTabChange(res.state);
      })
    },
    [id, setTabState, triggerTabChange]
  )
  return (<>
    <li role="presentation"
        className={cn('tab-widget__nav-item', className, {
          'active': isActive
        })}
    >
      <a className={cn('tab-widget__nav-item-tab', {
        'active': isActive
      })}
         href={`#tab_${id}`}
         role="tab"
         aria-controls={label}
         onClick={handleTabItemClick}
      >
        { label }
      </a>
    </li>
  </>);
});
