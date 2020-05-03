import { IStories, IStory } from '../../../models';

export interface StoriesState {
  stories: IStories;
}

export const initialStoriesState: StoriesState = {
  stories: [],
};

export enum StoriesType {
  addStory = 'addStory',
}
export const createAddStory = (payload: IStory) => ({
  type: StoriesType.addStory,
  payload,
});
export type CreateAddStory = typeof createAddStory;
export type AddStoryAction = ReturnType<CreateAddStory>;

export type StoriesAction = AddStoryAction;

export type ActionCreator = CreateAddStory;

export const story = (
  state: StoriesState,
  action: StoriesAction,
): StoriesState => {
  switch (action.type) {
    case StoriesType.addStory:
      return {
        ...state,
        stories: [action.payload, ...state.stories].sort((a, b) =>
          a.time > b.time ? 1 : -1,
        ),
      };
    default:
      return state;
  }
};
