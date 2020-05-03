export const storyTypes = ['job', 'story', 'poll'] as const;
export type StoryTypes = typeof storyTypes;
export type StoryType = StoryTypes[number];

export interface CreationStory {
  by: string;
  title: string;
  type: StoryType;
  url: string;
}

export interface IStory extends CreationStory {
  id: number;
  time: number;
}

export type IStories = IStory[];

export type StoryIds = IStory['id'][];
