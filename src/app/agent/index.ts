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

    const onStart = payload.onStart;
    const onSuccess = payload.onSuccess;
    const onEnd = payload.onEnd;
    const cache = payload.cache;

    const cacheEnabled = !!cache && !cache.disabled;
    const existingCacheData = agentCache.get(payload.url);

    if (cacheEnabled && existingCacheData) {
      const { lastResponseTime, data } = existingCacheData;
      const cacheNotExpired = Date.now() < lastResponseTime + ms(cache.expires);

      if (cacheNotExpired) {
        onSuccess && dispatch(onSuccess(data));
        return;
      }
    }

    try {
      onStart && dispatch(onStart);

      const { data } = await axios({
        url: payload.url,
        method: payload.method,
        data: payload.data,
      });

      if (cache) {
        addAgentCacheItem(payload.url, cache.expires, data);
      } else if (existingCacheData) {
        updateAgentCacheItem(payload.url, data);
      }

      onSuccess && dispatch(onSuccess(data));
    } catch (error) {
      if (payload.onError) {
        dispatch(payload.onError(error));
        return;
      }

      if (onError) {
        onError(error);
        return;
      }

      throw error;
    } finally {
      onEnd && dispatch(onEnd);
    }
  };
