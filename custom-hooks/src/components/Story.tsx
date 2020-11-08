import React from 'react';
import { IStory } from '../models';

export interface StoryProps extends IStory {}

export const Story: React.FC<StoryProps> = ({
  score,
  title,
  url,
  type,
  time,
  by,
}) => {
  const date = new Date(time);
  const timeString = date.toLocaleTimeString();
  const dateString = date.toLocaleDateString();

  return (
    <div>
      <a href={url} target="__blank">
        {title}
      </a>
      <div>
        {score} points | {type} | <span title={dateString}>{timeString}</span> |{' '}
        {by}
      </div>
    </div>
  );
};
