import ms from 'ms';

interface AgentCacheItem {
  expirationTimes: number[];
  lastResponseTime: number;
  data: unknown;
}

export const agentCache = new Map<string, AgentCacheItem>();

export function addAgentCacheItem(url: string, expires: string, data: unknown) {
  const expirationTime = ms(expires);
  const existingCacheData = agentCache.get(url);

  if (existingCacheData) {
    existingCacheData.expirationTimes.push(expirationTime);
    existingCacheData.lastResponseTime = Date.now();
    existingCacheData.data = data;
  } else {
    agentCache.set(url, {
      expirationTimes: [expirationTime],
      lastResponseTime: Date.now(),
      data,
    });
  }
}

export function updateAgentCacheItem(url: string, data: unknown) {
  const cacheItem = agentCache.get(url);
  if (!cacheItem) return;

  cacheItem.lastResponseTime = Date.now();
  cacheItem.data = data;
}

setInterval(() => {
  requestIdleCallback(() => {
    const now = Date.now();

    agentCache.forEach((item, key) => {
      const newExpirationTimes = Array.from(item.expirationTimes).filter(
        (expires) => now < expires + item.lastResponseTime
      );

      if (newExpirationTimes.length === 0) {
        agentCache.delete(key);
      } else {
        agentCache.set(key, { ...item, expirationTimes: newExpirationTimes });
      }
    });
  });
}, 1000);
