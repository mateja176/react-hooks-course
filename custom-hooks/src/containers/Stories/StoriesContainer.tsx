import React from 'react';
import { useFetchTopStoryIds } from '../../hooks/useFetchTopStoryIds';
import { Stories } from './Stories';

export interface StoriesContainerProps {}

export const StoriesContainer: React.FC<StoriesContainerProps> = () => {
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
      <ol>
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
      </ol>
    </div>
  );
};
