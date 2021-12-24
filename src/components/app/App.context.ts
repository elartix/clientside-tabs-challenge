import React, { Dispatch, SetStateAction, useContext } from 'react';

/*
export interface ITabWidgetContextState {
  section : Nullable<string|number>;
  activeTab: Nullable<string|number>;
  isLoading?: boolean;
}

export interface ITabWidgetContext {
  state: ITabWidgetContextState;
  setTabState: Dispatch<SetStateAction<ITabWidgetContext>>;
}

export const defaultTabContext: ITabWidgetContext = {
  state: {
    section: null,
    activeTab: null,
    isLoading: false,
  },
  setTabState: () => null,
};

export const TabWidgetContext = React.createContext<ITabWidgetContext|undefined>(undefined);

export const useTabWidgetContext = (): ITabWidgetContext => {
  const context = useContext(TabWidgetContext) as ITabWidgetContext;
  if (!context) {
    throw new Error('This component must be used within a <TabWidget> component.');
  }
  return context;
};
*/
