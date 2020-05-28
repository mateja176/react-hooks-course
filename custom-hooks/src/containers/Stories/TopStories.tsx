import React from 'react';
import { useFetchTopStoryIds } from '../../hooks/useFetchTopStoryIds';
import { Stories } from './Stories';

export interface TopStoriesProps {}

export const TopStories: React.FC<TopStoriesProps> = () => {
  const {
    isInitial,
    isLoading,
    error,
    refetch,
    hasLoaded,
    isEmpty,
    topStoryIds,
  } = useFetchTopStoryIds({});

  return (
    <div>
      <h1>Stories</h1>
      <div>
        {isInitial || isLoading ? (
          <p>Loading stories...</p>
        ) : error ? (
          <p>
            {error} <button onClick={refetch}>Retry</button>
          </p>
        ) : hasLoaded ? (
          isEmpty ? (
            <p>No stories at the moment</p>
          ) : (
            <Stories storyIds={topStoryIds} />
          )
        ) : null}
      </div>
    </div>
  );
};
