import React from 'react';
import { useFetchTopStoryIds } from '../../hooks/useFetchTopStoryIds';
import { Stories } from './Stories';

export const headerHeight = 61;

export interface TopStoriesProps {}

const listContainerStyle: React.CSSProperties = {
  height: `calc(100% - ${headerHeight}px)`,
};

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
    <div style={listContainerStyle}>
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
  );
};
