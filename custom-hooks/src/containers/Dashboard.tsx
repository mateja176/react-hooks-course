import React from 'react';
import { useActions, useSelector } from '../hooks';
import { createSetIsDialogOpen, selectIsDialogOpen } from '../utils';
import { AddStory } from './AddStory';
import { headerHeight, TopStories } from './Stories';

export interface DashboardProps {}

const rootStyle: React.CSSProperties = {
  height: '100vh',
};

const dialogStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.3)',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  border: 'none',
  transitionProperty: 'visibility,opacity',
  transitionTimingFunction: 'ease-in-out',
  transitionDuration: '500ms',
};

const dialogBoxStyle: React.CSSProperties = {
  background: '#202b38',
  padding: 20,
  borderRadius: 5,
  boxShadow: '10px 10px 30px #333',
};

const headerStyle: React.CSSProperties = {
  height: headerHeight,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const containerStyle: React.CSSProperties = {
  height: '100%',
  padding: '20px 20px 0 20px',
};

// * avoids creating a new object on each render
const actionCreators = {
  setIsDialogOpen: createSetIsDialogOpen,
};

export const Dashboard: React.FC<DashboardProps> = () => {
  const isDialogOpen = useSelector(selectIsDialogOpen);

  const { setIsDialogOpen } = useActions(actionCreators);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const dialogRef = React.useRef<HTMLDialogElement | null>(null);

  const handleDialogClick: React.MouseEventHandler = (e) => {
    toggleDialog();
  };

  const handleDialogBoxClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <div style={rootStyle}>
      <dialog
        ref={dialogRef}
        open={isDialogOpen}
        onClick={handleDialogClick}
        style={{
          ...dialogStyle,
          visibility: isDialogOpen ? 'visible' : 'hidden',
          opacity: isDialogOpen ? 1 : 0,
        }}
      >
        <div style={dialogBoxStyle} onClick={handleDialogBoxClick}>
          <AddStory />
        </div>
      </dialog>
      <div
        style={{
          ...containerStyle,
          overflow: isDialogOpen ? 'hidden' : 'initial',
        }}
      >
        <div style={headerStyle}>
          <h1>Stories</h1>
          <button onClick={toggleDialog}>Add story</button>
        </div>
        <TopStories />
      </div>
    </div>
  );
};
