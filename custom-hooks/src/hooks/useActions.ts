import { useContext, useMemo } from 'react';
import { Context } from '../Context';
import { Action } from '../utils';

export const useActions = <
  ActionCreators extends {
    [key: string]: (...params: any[]) => Action;
  }
>(
  actionCreators: ActionCreators,
) => {
  const { dispatch } = useContext(Context);

  return useMemo(
    () =>
      Object.fromEntries(
        Object.entries(actionCreators).map(([key, actionCreator]) => [
          key,
          (...params: Parameters<typeof actionCreator>) =>
            dispatch(actionCreator(...params)),
        ]),
      ),
    [dispatch, actionCreators],
  ) as ActionCreators;
};
