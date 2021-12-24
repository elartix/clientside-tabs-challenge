// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface ITabWidgetContextState {
  section : Nullable<string|number>;
  activeTab: Nullable<string|number>;
}

export const defaultTabContextState: ITabWidgetContextState = {
  section: null,
  activeTab: null,
}

export interface ITabWidgetContext {
  state: ITabWidgetContextState;
  // setTabState: Dispatch<SetStateAction<ITabWidgetContext>>;
  // setTabState: Dispatch<SetStateActionCallback<ITabWidgetContext>>;
  setTabState: DispatchWithCallback<SetStateAction<ITabWidgetContext>>;
  triggerTabChange?: Dispatch<any>,
}

export const defaultTabContext: ITabWidgetContext = {
  state: defaultTabContextState,
  setTabState: () => null,
  triggerTabChange: (state: any) => null,
};

export const TabWidgetContext = createContext<ITabWidgetContext|undefined>(undefined);

export const useTabWidgetContext = (): ITabWidgetContext => {
  const context = useContext(TabWidgetContext) as ITabWidgetContext;
  if (!context) {
    throw new Error('This component must be used within a <TabWidget> component.');
  }
  return context;
};
