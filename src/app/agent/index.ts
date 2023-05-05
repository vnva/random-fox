import { Middleware } from '@reduxjs/toolkit';
import axios from 'axios';
import ms from 'ms';

import { isAgentAction } from './actions';
import { addAgentCacheItem, agentCache, updateAgentCacheItem } from './cache';

export const agentMiddleware =
  (onError?: (error: unknown) => void): Middleware =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);

    if (!isAgentAction(action)) return;

    const { payload } = action;

    try {
      if (payload.onStart) dispatch(payload.onStart);

      if (!!payload.cache && !payload.cache.disabled && agentCache.has(payload.url)) {
        const { data, lastResponseTime } = agentCache.get(payload.url)!;

        if (Date.now() < lastResponseTime + ms(payload.cache.expires)) {
          if (payload.onSuccess) dispatch(payload.onSuccess(data));
          return;
        }
      }

      const { data } = await axios({
        url: payload.url,
        method: payload.method,
        data: payload.data,
      });

      if (payload.cache) {
        addAgentCacheItem(payload.url, payload.cache.expires, data);
      } else if (agentCache.has(payload.url)) {
        updateAgentCacheItem(payload.url, data);
      }

      if (payload.onSuccess) dispatch(payload.onSuccess(data));
    } catch (error) {
      if (payload.onError) {
        dispatch(payload.onError(error));
        return;
      } else if (onError) {
        onError(error);
        return;
      } else {
        throw error;
      }
    } finally {
      if (payload.onEnd) dispatch(payload.onEnd);
    }
  };
