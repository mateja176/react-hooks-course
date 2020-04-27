import React from 'react';
import { Story } from '../components';
import { useSelector } from '../hooks';
import { selectStories } from '../utils';

export interface StoriesProps {}

export const Stories: React.FC<StoriesProps> = () => {
  const stories = useSelector(selectStories);

  return (
    <div>
      <h1>Stories</h1>
      <ol>
        {stories.length === 0 ? (
          <p>No stories at the moment</p>
        ) : (
          stories.map((story) => <Story key={story.id} {...story} />)
        )}
      </ol>
    </div>
  );
};
