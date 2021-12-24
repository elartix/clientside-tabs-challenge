import cn from 'classnames';
import React, {
  memo,
  Children,
  useContext,
  cloneElement,
  isValidElement,
  PropsWithChildren
} from 'react'

import { ITabWidgetContext, TabWidgetContext } from './TabWidget.context';

export interface ITabWidgetNavProps {
  className?: string;
}

export const TabWidgetContent = memo<PropsWithChildren<ITabWidgetNavProps>>(function TabWidgetContent ({
  className,
  children
}) {
  const { state } = useContext(TabWidgetContext) as ITabWidgetContext;

  return (<>
    <div className={cn('tab-widget__content', className, {
      'loading': state?.isLoading
    })}>
      { Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }
        return cloneElement(child, {  }); //isActive, onClick
      })}
    </div>
  </>);
});
