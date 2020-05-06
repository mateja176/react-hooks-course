import { range } from 'lodash';
import { useEffect, useState } from 'react';
import { ErrorObject, IStory, StoryIds } from '../models';
import { fetchStory } from '../services';

export interface FetchStoriesParams {
  batchSize: number;
  ids: StoryIds;
}

export type StoryData = IStory | 'loading' | ErrorObject;

export interface DataWithId {
  id: IStory['id'];
  data: StoryData;
}

export type DataWithIds = DataWithId[];

export const useFetchStories = ({ ids, batchSize }: FetchStoriesParams) => {
  const [offset, setOffset] = useState(0);
  const [dataWithIds, setDataWithIds] = useState<DataWithIds>([]);

  const createDataWithId = (id: IStory['id'], data: StoryData) => {
    setDataWithIds((currentDataWithIds) =>
      currentDataWithIds.concat({ id, data }),
    );
  };

  const setDataWithId = (id: IStory['id'], data: StoryData) => {
    setDataWithIds((currentDataWithIds) =>
      currentDataWithIds.map((dataWithId) =>
        dataWithId.id === id ? { id, data } : dataWithId,
      ),
    );
  };

  const fetchStoryForId = (id: IStory['id']) => {
    createDataWithId(id, 'loading');

    return fetchStory({ id })
      .then((story) => {
        setDataWithId(id, story);
      })
      .catch((error) => {
        setDataWithId(id, {
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

  const fetchMore = () => {
    setOffset((currentOffset) => currentOffset + batchSize);
  };

  return { dataWithIds, fetchMore };
};
