import { State } from '../reducer';
import { compose } from '../utils';

export const selectStoryState = ({ story }: State) => story;

export const selectStories = compose(
  selectStoryState,
  ({ stories }) => stories,
);
