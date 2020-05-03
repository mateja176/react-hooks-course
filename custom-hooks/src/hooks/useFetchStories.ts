import { OrderedMap } from 'immutable';
import { range } from 'lodash';
import { useEffect, useState } from 'react';
import { ErrorObject, IStory, StoryIds } from '../models';
import { fetchStory } from '../services';

export interface FetchStoriesParams {
  batchSize: number;
  ids: StoryIds;
}

export type StoryValues = IStory | 'loading' | ErrorObject;

export type StoriesData = OrderedMap<IStory['id'], StoryValues>;

export const useFetchStories = ({ ids, batchSize }: FetchStoriesParams) => {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<StoriesData>(OrderedMap());

  const setOne = (id: IStory['id'], value: StoryValues) => {
    setData((currentDate) => currentDate.set(id, value));
  };

  const fetchStoryForId = (id: IStory['id']) => {
    setOne(id, 'loading');

    return fetchStory({ id })
      .then((story) => {
        setOne(id, story);
      })
      .catch((error) => {
        setOne(id, {
          error,
          retry: () => {
            fetchStoryForId(id);
          },
        });
      });
  };

  useEffect(() => {
    if (ids.length > batchSize) {
      const storyIds = range(offset, offset + batchSize).map(
        (ordinal) => ids[ordinal],
      );

      storyIds.forEach(fetchStoryForId);
    }
  }, [ids, batchSize, offset]); // eslint-disable-line react-hooks/exhaustive-deps

  const stories = Array.from(data.values());

  const fetchMore = () => {
    setOffset((currentOffset) => currentOffset + batchSize);
  };

  return { stories, fetchMore };
};
