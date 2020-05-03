import { StoryIds } from '../../models';

const origin = 'https://hacker-news.firebaseio.com/v0/';

export enum RequestPath {
  topStories = 'topstories.json',
}

export const fetchHN = <R>(path: RequestPath, init: RequestInit) =>
  fetch(`${origin}${path}`, init).then((res) => res.json() as Promise<R>);

export const fetchTopStoryIds = (init: RequestInit) =>
  fetchHN<StoryIds>(RequestPath.topStories, init);
