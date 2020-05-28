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

const dialogStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.3)',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
};

const dialogBoxStyle: React.CSSProperties = {
  background: 'white',
  padding,
  borderRadius: 5,
  boxShadow: '10px 10px 30px #333',
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
  height: '100%',
};

export const Dashboard: React.FC<DashboardProps> = () => {
  const isDialogOpen = useSelector(selectIsDialogOpen);

  const { setIsDialogOpen } = useActions({
    setIsDialogOpen: createSetIsDialogOpen,
  });

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
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
      <dialog
        ref={dialogRef}
        open={isDialogOpen}
        onClick={handleDialogClick}
        style={{ ...dialogStyle, display: isDialogOpen ? 'flex' : 'none' }}
      >
        <div style={dialogBoxStyle}>
          <AddStory />
        </div>
      </dialog>
      <div style={headerStyle}>
        <button onClick={toggleDialog}>Add story</button>
      </div>
      <div
        style={{
          ...containerStyle,
          overflow: isDialogOpen ? 'hidden' : 'auto',
        }}
      >
        <TopStories />
      </div>
    </div>
  );
};
