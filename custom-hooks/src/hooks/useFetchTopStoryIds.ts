import { useEffect, useState } from 'react';
import { fetchTopStoryIds, TopStoryIds } from '../services';

export const useFetchTopStoryIds = (init: RequestInit) => {
  const [topStoryIds, setTopStoryIds] = useState<TopStoryIds>([]);

  useEffect(() => {
    fetchTopStoryIds(init).then(setTopStoryIds);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return topStoryIds;
};
