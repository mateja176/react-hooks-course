export type RequestData<Result> = 'initial' | Result | 'loading' | Error;

export interface ErrorObject {
  error: Error;
  retry: () => void;
}
