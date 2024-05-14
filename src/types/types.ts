export enum Status {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}

export interface ResponseData<T> {
  status: Status,
  data?: T,
  error?: string
}