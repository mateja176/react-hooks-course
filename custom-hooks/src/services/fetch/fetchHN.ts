import { IStory, StoryIds } from '../../models';

const origin = 'https://hacker-news.firebaseio.com/v0/';

export enum RequestPath {
  topStories = 'topstories.json',
}

export const fetchHN = <R>(path: string, init?: RequestInit) =>
  fetch(`${origin}${path}`, init).then((res) => res.json() as Promise<R>);

export const fetchTopStoryIds = (init: RequestInit) =>
  fetchHN<StoryIds>(RequestPath.topStories, init);

export const fetchStory = ({
  id,
  ...init
}: { id: IStory['id'] } & RequestInit) =>
  fetchHN<IStory>(`item/${id}.json`, init);
