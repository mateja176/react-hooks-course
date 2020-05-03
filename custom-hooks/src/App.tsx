import React from 'react';
import { Dashboard } from './containers';
import { Context } from './Context';
import { initialState, reducer } from './utils';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Dashboard />
    </Context.Provider>
  );
}

export default App;
