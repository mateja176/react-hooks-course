import { useContext, useMemo } from 'react';
import { Context } from '../Context';
import { State } from '../utils';

export const useSelector = <R>(selector: (state: State) => R) => {
  const { state } = useContext(Context);

  const slice = useMemo(() => selector(state), [state]); // eslint-disable-line react-hooks/exhaustive-deps

  return slice;
};
