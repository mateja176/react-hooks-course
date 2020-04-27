import React from 'react';
import { AddStory, Stories } from './containers';
import { Context } from './Context';
import {
  createSetIsDialogOpen,
  initialState,
  reducer,
  selectIsDialogOpen,
} from './utils';

const containerStyle: React.CSSProperties = {
  height: '100vh',
  padding: 20,
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const isDialogOpen = selectIsDialogOpen(state);

  const openDialog = () => {
    dispatch(createSetIsDialogOpen(true));
  };

  const dialogRef = React.useRef<HTMLDialogElement | null>(null);

  React.useEffect(() => {
    const eventType: keyof WindowEventMap = 'click';
    const handleClickOutside = () => {
      if (isDialogOpen) {
        dispatch(createSetIsDialogOpen(false));
      }
    };

    window.addEventListener(eventType, handleClickOutside);

    return () => {
      window.removeEventListener(eventType, handleClickOutside);
    };
  }, [isDialogOpen]);

  const handleDialogClick: React.DialogHTMLAttributes<
    HTMLDialogElement
  >['onClick'] = (e) => {
    e.stopPropagation();
  };

  return (
    <div style={containerStyle}>
      <Context.Provider value={{ state, dispatch }}>
        <dialog ref={dialogRef} open={isDialogOpen} onClick={handleDialogClick}>
          <AddStory />
        </dialog>
        <button onClick={openDialog}>Open dialog</button>
        <Stories />
      </Context.Provider>
    </div>
  );
}

export default App;
