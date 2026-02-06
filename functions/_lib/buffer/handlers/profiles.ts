import { proxyBuffer } from '../client';
import type { Context } from '../types';

export const handleProfiles = (context: Context) =>
  proxyBuffer(context, { bufferPath: '/profiles.json', method: 'GET' });

export const handlePendingUpdates = (context: Context, profileId: string, query: string) =>
  proxyBuffer(context, {
    bufferPath: `/profiles/${profileId}/updates/pending.json${query}`,
    method: 'GET'
  });

export const handleSentUpdates = (context: Context, profileId: string, query: string) =>
  proxyBuffer(context, {
    bufferPath: `/profiles/${profileId}/updates/sent.json${query}`,
    method: 'GET'
  });

export const handleShuffleUpdates = (context: Context, profileId: string) =>
  proxyBuffer(context, {
    bufferPath: `/profiles/${profileId}/updates/shuffle.json`,
    method: 'POST'
  });
