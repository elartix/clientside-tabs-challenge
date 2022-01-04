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

export const TabWidgetContent = memo<PropsWithChildren<ITabWidgetNavProps>>(function TabWidgetContent ({
  className,
  children
}) {
  return (<>
    <div className={cn('tab-widget__content', className)}>
      { Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }
        return cloneElement(child, {  }); //isActive, onClick
      })}
    </div>
  </>);
});
