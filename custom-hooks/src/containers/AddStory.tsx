import React from 'react';
import { useActions } from '../hooks';
import { CreationStory } from '../models';
import { createAddStory } from '../utils';
import { createToggleIsDialogOpen } from '../utils/slices/dialog';

export interface AddStoryProps {}

const wrapperStyle: React.CSSProperties = {
  marginBottom: 20,
};

const labelStyle: React.CSSProperties = {
  width: 40,
  display: 'inline-block',
};

const initialStory: CreationStory = {
  by: '',
  title: '',
  type: 'story',
  url: '',
};

export const AddStory: React.FC<AddStoryProps> = () => {
  const { toggleDialog } = useActions({
    toggleDialog: createToggleIsDialogOpen,
  });

  const [story, setStory] = React.useState(initialStory);

  const handleChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => {
    setStory({ ...story, [currentTarget.name]: currentTarget.value });
  };

  const { addStory } = useActions({ addStory: createAddStory });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addStory({ ...story, time: Date.now(), id: Math.random() * 100 });
          toggleDialog();
        }}
      >
        <div style={wrapperStyle}>
          <label>
            <span style={labelStyle}>By</span>{' '}
            <input
              name="by"
              placeholder="William Shakespeare"
              value={story.by}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </label>
        </div>
        <div style={wrapperStyle}>
          <label>
            <span style={labelStyle}>Title</span>{' '}
            <input
              name="title"
              placeholder="A Midsummer Night's Dream"
              value={story.title}
              onChange={handleChange}
              required
              maxLength={50}
            />
          </label>
        </div>
        <div style={wrapperStyle}>
          <label>
            <span style={labelStyle}>Type</span>{' '}
            <select
              name="type"
              placeholder="Comedy"
              value={story.type}
              onChange={handleChange}
              required
            >
              <option value="story">Story</option>
              <option value="job">Job</option>
              <option value="poll">Poll</option>
            </select>
          </label>
        </div>
        <div style={wrapperStyle}>
          <label>
            <span style={labelStyle}>URL</span>{' '}
            <input
              name="url"
              placeholder="https://news.ycombinator.com/"
              value={story.url}
              onChange={handleChange}
              required
              maxLength={200}
            />
          </label>
        </div>
        <input type="submit" value="Create story" />
      </form>
    </div>
  );
};
