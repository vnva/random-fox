import { Method } from 'axios';

import { AgentActionPayload, agentRequestAction } from './actions';

type CreateEndpointOptions<T, R, M extends Method = 'get'> = Omit<
  AgentActionPayload<T, R, M>,
  'onSuccess' | 'onError' | 'onStart' | 'onEnd' | 'data'
>;

type EndpointOptions<T, R, M extends Method = 'get'> = Pick<
  AgentActionPayload<T, R, M>,
  'onSuccess' | 'onError' | 'onStart' | 'onEnd' | 'data'
>;

export const createApiEndpoint =
  <T, R, M extends Method = 'get'>(createEndpointOptions: CreateEndpointOptions<T, R, M>) =>
  (endpointOptions: EndpointOptions<T, R, M>) =>
    agentRequestAction({
      ...createEndpointOptions,
      ...endpointOptions,
    });
