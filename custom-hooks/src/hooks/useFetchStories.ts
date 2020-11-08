import { useEffect, useState } from 'react';
import { ErrorObject, IStory, StoryIds } from '../models';
import { fetchStory } from '../services';

export interface FetchStoriesParams {
  batchSize: number;
  ids: StoryIds;
}

export type StoryData = 'initial' | 'loading' | IStory | ErrorObject;

export interface DataWithId {
  id: IStory['id'];
  data: StoryData;
}

export type DataWithIds = DataWithId[];

export const useFetchStories = ({ ids, batchSize }: FetchStoriesParams) => {
  const [dataWithIds, setDataWithIds] = useState<DataWithIds>(
    ids.map((id) => ({ id, data: 'initial' })),
  );

  const setDataWithId = (id: IStory['id'], data: StoryData) => {
    setDataWithIds((currentDataWithIds) =>
      currentDataWithIds.map((dataWithId) =>
        dataWithId.id === id ? { id, data } : dataWithId,
      ),
    );
  };

  const fetchStoryForId = (id: IStory['id']) => {
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

  const fetchMore = () => {
    setDataWithIds(() => {
      const offsetStart = dataWithIds.findIndex(
        ({ data }) => data === 'initial',
      );
      const offsetStop = offsetStart + batchSize;

      const ids = dataWithIds
        .slice(offsetStart, offsetStop)
        .map(({ id }) => id);

      ids.forEach((id) => {
        fetchStoryForId(id);
      });

      return dataWithIds.map((dataWithId) => {
        const { id } = dataWithId;

        return ids.includes(id) ? { id, data: 'loading' } : dataWithId;
      });
    });
  };

  useEffect(() => {
    fetchMore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { dataWithIds, fetchMore };
};
