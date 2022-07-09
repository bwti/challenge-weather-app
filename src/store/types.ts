export enum StatusState {
  Idle = 'idle',
  Pending = 'pending',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export interface ServiceStatus {
  name: string;
  state: StatusState;
  failure: string | undefined;
}
