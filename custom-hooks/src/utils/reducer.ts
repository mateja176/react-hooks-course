import React from 'react';
import { initialStoriesState, story } from './slices';
import { dialog, initialDialogState } from './slices/dialog';
import { combineReducers } from './utils';

export const initialState: State = {
  story: initialStoriesState,
  dialog: initialDialogState,
};

export const reducer = combineReducers({
  story,
  dialog,
});

export type Reducer = typeof reducer;

export type State = React.ReducerState<Reducer>;

export type Action = React.ReducerAction<Reducer>;
