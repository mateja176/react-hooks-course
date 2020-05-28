import React from 'react';
import { useActions, useSelector } from '../hooks';
import { createSetIsDialogOpen, selectIsDialogOpen } from '../utils';
import { AddStory } from './AddStory';
import { TopStories } from './Stories';

export interface DashboardProps {}

const padding = 20;

const rootStyle: React.CSSProperties = {
  height: '100vh',
};

const headerStyle: React.CSSProperties = {
  position: 'fixed',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  padding,
};

const containerStyle: React.CSSProperties = {
  padding,
};

export const Dashboard: React.FC<DashboardProps> = () => {
  const isDialogOpen = useSelector(selectIsDialogOpen);

  const { setIsDialogOpen } = useActions({
    setIsDialogOpen: createSetIsDialogOpen,
  });

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const dialogRef = React.useRef<HTMLDialogElement | null>(null);

  React.useEffect(() => {
    const eventType: keyof WindowEventMap = 'click';
    const handleClickOutside = () => {
      if (isDialogOpen) {
        setIsDialogOpen(false);
      }
    };

    window.addEventListener(eventType, handleClickOutside);

    return () => {
      window.removeEventListener(eventType, handleClickOutside);
    };
  }, [isDialogOpen, setIsDialogOpen]);

  const handleDialogClick: React.DialogHTMLAttributes<
    HTMLDialogElement
  >['onClick'] = (e) => {
    e.stopPropagation();
  };

  return (
    <div style={rootStyle}>
      <dialog ref={dialogRef} open={isDialogOpen} onClick={handleDialogClick}>
        <AddStory />
      </dialog>
      <div style={headerStyle}>
        <button onClick={openDialog}>Add story</button>
      </div>
      <div style={containerStyle}>
        <TopStories />
      </div>
    </div>
  );
};
