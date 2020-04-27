import React from 'react';
import { IStory } from '../models';

export interface StoryProps extends IStory {}

export const Story: React.FC<StoryProps> = ({
  id,
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
    <li>
      <a href={url} target="__blank">
        {title}
      </a>
      <div>
        {type} | <span title={dateString}>{timeString}</span> | {by}
      </div>
    </li>
  );
};
