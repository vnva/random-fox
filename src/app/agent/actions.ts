import { Action } from '@reduxjs/toolkit';
import { Method } from 'axios';

export const AGENT_REQUEST_ACTION = 'AGENT_REQUEST';

export interface AgentActionPayload<T, R, M extends Method> {
  url: string;
  method?: M;
  data?: T;
  onSuccess?: (payload: R) => Action;
  onError?: (payload: unknown) => Action;
  onStart?: Action;
  onEnd?: Action;
  cache?: M extends 'get' | 'GET'
    ? {
        expires: string;
        disabled?: boolean;
      }
    : never;
}

export function agentRequestAction<T, R, M extends Method = 'get'>(
  payload: AgentActionPayload<T, R, M>
) {
  return {
    type: AGENT_REQUEST_ACTION,
    payload,
  };
}

export function isAgentAction(action: unknown): action is ReturnType<typeof agentRequestAction> {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    action.type === AGENT_REQUEST_ACTION
  );
}
