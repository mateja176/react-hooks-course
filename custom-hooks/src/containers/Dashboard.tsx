import React from 'react';
import { useActions, useSelector } from '../hooks';
import { createSetIsDialogOpen, selectIsDialogOpen } from '../utils';
import { AddStory } from './AddStory';
import { Stories } from './Stories';

export interface DashboardProps {}

const containerStyle: React.CSSProperties = {
  height: '100vh',
  padding: 20,
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
    <div style={containerStyle}>
      <dialog ref={dialogRef} open={isDialogOpen} onClick={handleDialogClick}>
        <AddStory />
      </dialog>
      <button onClick={openDialog}>Open dialog</button>
      <Stories />
    </div>
  );
};
