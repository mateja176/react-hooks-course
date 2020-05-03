import { RequestData } from '../models/request';

export const getRequestResult = <R>(initialResult: R) => (
  data: RequestData<R>,
) => (data === 'initial' ? initialResult : data === 'loading' ? null : null);
