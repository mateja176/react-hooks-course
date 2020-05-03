import { compose } from '../../utils';
import { State } from '../reducer';

export const selectStoryState = ({ story }: State) => story;

export const selectStories = compose(
  selectStoryState,
  ({ stories }) => stories,
);
