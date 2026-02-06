import { proxyBuffer } from '../client';
import type { Context } from '../types';

export const handleUser = (context: Context) =>
  proxyBuffer(context, { bufferPath: '/user.json', method: 'GET' });
