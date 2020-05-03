import { useEffect, useState } from 'react';
import { StoryIds } from '../models';
import { RequestData } from '../models/request';
import { fetchTopStoryIds } from '../services';
import { getRequestResult } from '../utils/request';

const initialTopStoryIds: StoryIds = [];

export const useFetchTopStoryIds = (
  init: RequestInit,
  compare: (
    newParams: RequestInit,
    currentParams: RequestInit,
  ) => boolean = () => false,
) => {
  const [data, setData] = useState<RequestData<StoryIds>>('initial');

  const [params, setParams] = useState(init);

  useEffect(() => {
    setParams((currentParams) =>
      compare(init, currentParams) ? init : currentParams,
    );
  }, [init]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchTopStoryIds(params).then(setData);
  }, [params]);

  const topStoryIds = getRequestResult(initialTopStoryIds)(data);

  const hasError = data instanceof Error;

  return {
    topStoryIds,
    isLoading: data === 'loading',
    hasError,
    error: hasError ? data : null,
  };
};
