import { useEffect, useState } from 'react';
import { StoryIds } from '../models';
import { RequestData } from '../models/request';
import { fetchTopStoryIds } from '../services';

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

  const topStoryIds =
    data === 'initial' || data === 'loading' || data instanceof Error
      ? []
      : data;

  const hasError = data instanceof Error;

  const refetch = hasError
    ? () => {
        setParams({ ...params });
      }
    : () => {};

  return {
    isInitial: data === 'initial',
    topStoryIds,
    isLoading: data === 'loading',
    hasError,
    error: hasError ? data : null,
    refetch,
  };
};
