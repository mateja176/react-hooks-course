import { debounce } from 'lodash';
import React from 'react';
import { Spinner, Story } from '../../components';
import { useSelector } from '../../hooks';
import { DataWithIds, useFetchStories } from '../../hooks/useFetchStories';
import { IStory } from '../../models';
import { isErrorObject, selectStories } from '../../utils';

const storyHeight = 44;

const batchSize = 20;

export interface StoriesProps {
  storyIds: IStory['id'][];
}

export const Stories: React.FC<StoriesProps> = ({ storyIds }) => {
  const stories = useSelector(selectStories);

  const storyState = useFetchStories({
    ids: storyIds,
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

  const dataWithIds: DataWithIds = [
    ...stories.map((story) => ({ id: story.id, data: story })),
    ...storyState.dataWithIds,
  ];

  return dataWithIds.length === 0 ? (
    <p>No stories at the moment</p>
  ) : (
    <div style={{ height: storyHeight }}>
      {dataWithIds.map(({ id, data }) => (
        <div key={id}>
          {data === 'loading' ? (
            <p>Loading Story...</p>
          ) : isErrorObject(data) ? (
            <p>
              {data.error.message} <button onClick={data.retry}>Retry</button>
            </p>
          ) : (
            <Story {...data} />
          )}
        </div>
      ))}
      <Spinner ref={markerRef} isVisible={dataWithIds.length >= batchSize} />
    </div>
  );
};
