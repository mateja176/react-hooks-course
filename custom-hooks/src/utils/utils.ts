import { Reducer, ReducerAction, ReducerState } from 'react';

export const combineReducers = <
  Reducers extends {
    [key: string]: Reducer<any, any>;
  }
>(
  reducers: Reducers,
): Reducer<
  { [key in keyof Reducers]: ReducerState<Reducers[key]> },
  ReducerAction<Reducers[keyof Reducers]>
> => (state, action) =>
  Object.fromEntries(
    Object.entries(reducers).map(([key, reducer]) => {
      const newState = reducer(state[key], action);
      return [key, newState];
    }),
  ) as typeof state;

export const compose = <Params extends any[], O, R>(
  a: (...params: Params) => O,
  b: (i: O) => R,
) => (...params: Params) => b(a(...params));
