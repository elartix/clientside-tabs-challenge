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

  const { state: { activeTab, isLoading }, setTabState, triggerTabChange } = useTabWidgetContext();

  const isActive = useMemo(
    () => {
      // console.log(activeTab, id, `tab_${id}`, activeTab === `tab_${id}`)
      return activeTab === `tab_${id}`
    },
    [activeTab, id]
  )


  const handleTabItemClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // console.log(event.currentTarget)
      event.preventDefault();

      setTabState && setTabState((prevState) => {
        const newActiveId = `tab_${id}`;
        // eslint-disable-next-line no-restricted-globals
        // history.pushState({}, '', `?activeTab=${newActiveId}`);

        const newState = {
          ...prevState,
          state: {
            ...prevState.state,
            section: id,
            activeTab: newActiveId
          }
        }
        return newState
      }, (res: ITabWidgetContext) => {
        triggerTabChange && triggerTabChange(res.state);
      })
    },
    [id, setTabState, triggerTabChange]
  )
  return (<>
    <li role="presentation"
        className={cn('tab-widget__nav-item', className, {
          'active': isActive,
          'loading': isLoading
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
