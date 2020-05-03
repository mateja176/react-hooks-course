import React from 'react';
import { combineReducers } from '../utils';
import { initialStoriesState, story } from './slices';
import { dialog, initialDialogState } from './slices/dialog';

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
