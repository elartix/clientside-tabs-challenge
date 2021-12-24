/// <reference types="react-scripts" />
type Nullable<T> = T | undefined | null;

type DispatchWithCallback<A> = (value: A, callback: Callback) => void;

type Callback<S> = (state:s) => (void | (() => void | undefined));
