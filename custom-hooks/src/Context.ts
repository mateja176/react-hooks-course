import { createContext, Dispatch } from 'react';
import { Action, initialState, State } from './utils';

export interface IContext {
  state: State;
  dispatch: Dispatch<Action>;
}

export const Context = createContext<IContext>({
  state: initialState,
  dispatch: () => {},
});
