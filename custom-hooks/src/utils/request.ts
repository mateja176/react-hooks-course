import { ErrorObject } from '../models/request';

export function isErrorObject(object: any): object is ErrorObject {
  return object.error instanceof Error && typeof object.retry === 'function';
}
