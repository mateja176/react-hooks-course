import { debounce } from 'lodash';
import React from 'react';
import { Spinner, Story } from '../components';
import { useSelector } from '../hooks';
import { useFetchStories } from '../hooks/useFetchStories';
import { useFetchTopStoryIds } from '../hooks/useFetchTopStoryIds';
import { isErrorObject, selectStories } from '../utils';

export interface StoriesProps {}

const batchSize = 20;

const storyHeight = 44;

export const Stories: React.FC<StoriesProps> = () => {
  const stories = useSelector(selectStories);

  const storyIdState = useFetchTopStoryIds({});

  const storyState = useFetchStories({
    ids: storyIdState.topStoryIds,
    batchSize,
  });

  const { fetchMore } = storyState;

  const debouncedFetchMore = React.useCallback(debounce(fetchMore, 400), []);

  const markerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const eventType: keyof WindowEventMap = 'wheel';
    const handleScroll: React.WheelEventHandler = (e) => {
      const isDirectionDown = e.deltaY > 0;
      if (markerRef.current && isDirectionDown) {
        const { top } = markerRef.current.getBoundingClientRect();

        if (top < window.innerHeight) {
          debouncedFetchMore();
        }
      }
    };

    window.addEventListener(
      eventType,
      (handleScroll as unknown) as EventListener,
    );

    return () => {
      window.removeEventListener(
        eventType,
        (handleScroll as unknown) as EventListener,
      );
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const allStories: typeof storyState.stories = [
    ...stories,
    ...storyState.stories,
  ];

  return (
    <div>
      <h1>Stories</h1>
      <ol>
        {storyIdState.isInitial ? (
          <Spinner />
        ) : storyIdState.isLoading ? (
          <p>Loading stories...</p>
        ) : storyIdState.error ? (
          <p>
            {storyIdState.error}{' '}
            <button onClick={storyIdState.refetch}>Retry</button>
          </p>
        ) : storyState.stories.length === 0 ? (
          <p>No stories at the moment</p>
        ) : (
          <div>
            {allStories.map((story) =>
              story === 'loading' ? (
                <p style={{ height: storyHeight }}>Loading Story...</p>
              ) : isErrorObject(story) ? (
                <p>
                  {story.error.message}{' '}
                  <button onClick={story.retry}>Retry</button>
                </p>
              ) : (
                <Story key={story.id} {...story} />
              ),
            )}
            <Spinner
              ref={markerRef}
              isVisible={allStories.length >= batchSize}
            />
          </div>
        )}
      </ol>
    </div>
  );
};
