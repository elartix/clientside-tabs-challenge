import cn from 'classnames';
import React, {
  memo,
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren
} from 'react'


export interface ITabWidgetNavProps {
  className?: string;
}

export const TabWidgetNav = memo<PropsWithChildren<ITabWidgetNavProps>>(function TabWidgetNav ({
  className,
  children
}) {

  return (
    <ul className={cn('tab-widget__nav', className)}>
      { Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }
        return cloneElement(child, {  }); //isActive, onClick
      })}
    </ul>
  );
});
