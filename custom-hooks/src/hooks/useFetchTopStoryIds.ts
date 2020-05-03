import { useEffect, useState } from 'react';
import { StoryIds } from '../models';
import { RequestData } from '../models/request';
import { fetchTopStoryIds } from '../services';
import { getRequestResult } from '../utils/request';

const initialTopStoryIds: StoryIds = [];

export const useFetchTopStoryIds = (init: RequestInit) => {
  const [data, setData] = useState<RequestData<StoryIds>>('initial');

  useEffect(() => {
    fetchTopStoryIds(init).then(setData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const topStoryIds = getRequestResult(initialTopStoryIds)(data);

  const hasError = data instanceof Error;

  return {
    topStoryIds,
    isLoading: data === 'loading',
    hasError,
    error: hasError ? data : null,
  };
};
