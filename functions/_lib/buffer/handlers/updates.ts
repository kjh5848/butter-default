import { proxyBuffer } from '../client';
import type { Context } from '../types';

export const handleCreateUpdate = (context: Context) =>
  proxyBuffer(context, { bufferPath: '/updates/create.json', method: 'POST' });
