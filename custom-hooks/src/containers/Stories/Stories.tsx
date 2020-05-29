import React from 'react';
import { Story } from '../../components';
import { useSelector } from '../../hooks';
import { DataWithIds, useFetchStories } from '../../hooks/useFetchStories';
import { IStory } from '../../models';
import { isErrorObject, selectStories } from '../../utils';

const storyHeight = 44;

const listStyle: React.CSSProperties = {
  height: '100%',
  overflow: 'auto',
};

const listItemStyle: React.CSSProperties = {
  height: storyHeight,
};

const batchSize = 20;

export interface StoriesProps {
  storyIds: IStory['id'][];
}

export const Stories: React.FC<StoriesProps> = ({ storyIds }) => {
  const stories = useSelector(selectStories);

  const { dataWithIds, fetchMore } = useFetchStories({
    ids: storyIds,
    batchSize,
  });

  const mergedData: DataWithIds = [
    ...stories.map((story) => ({ id: story.id, data: story })),
    ...dataWithIds,
  ];

  const handleWheel: React.WheelEventHandler<HTMLOListElement> = (e) => {
    if (e.deltaY > 0) {
      const lastIndexInView =
        Math.ceil(
          (e.currentTarget.offsetHeight + e.currentTarget.scrollTop) /
            storyHeight,
        ) - 1;

      if (dataWithIds[lastIndexInView].data === 'initial') {
        fetchMore();
      }
    }
  };

  return (
    <ol style={listStyle} onWheel={handleWheel}>
      {mergedData.map(({ id, data }) => (
        <li key={id} style={listItemStyle}>
          {data === 'initial' ? (
            <p>Waiting...</p>
          ) : data === 'loading' ? (
            <p>Loading Story...</p>
          ) : isErrorObject(data) ? (
            <p>
              {data.error.message} <button onClick={data.retry}>Retry</button>
            </p>
          ) : (
            <Story {...data} />
          )}
        </li>
      ))}
    </ol>
  );
};
