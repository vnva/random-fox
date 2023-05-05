import ms from 'ms';

interface AgentCacheItem {
  expires: number[];
  lastResponseTime: number;
  data: unknown;
}

export const agentCache = new Map<string, AgentCacheItem>();

export function addAgentCacheItem(url: string, expires: string, data: unknown) {
  const msExpires = ms(expires);

  if (agentCache.has(url)) {
    const newExpires = [...agentCache.get(url)!.expires, msExpires];

    agentCache.set(url, {
      expires: newExpires,
      lastResponseTime: Date.now(),
      data,
    });
  }

  agentCache.set(url, { expires: [msExpires], lastResponseTime: Date.now(), data });
}

export function updateAgentCacheItem(url: string, data: unknown) {
  agentCache.set(url, {
    expires: [...agentCache.get(url)!.expires],
    lastResponseTime: Date.now(),
    data,
  });
}

setInterval(
  () =>
    requestIdleCallback(() => {
      const now = Date.now();

      for (const [key, item] of agentCache) {
        const newExpires = item.expires.filter((expires) => now < expires + item.lastResponseTime);

        if (newExpires.length === 0) {
          agentCache.delete(key);
        } else {
          agentCache.set(key, { ...item, expires: newExpires });
        }
      }
    }),
  1000
);
