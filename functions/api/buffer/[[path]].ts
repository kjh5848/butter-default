import { routeBuffer } from '../../_lib/buffer/router';
import type { Context } from '../../_lib/buffer/types';

export const onRequest = async (context: Context) => {
  const { request } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,OPTIONS',
        'access-control-allow-headers': 'authorization,content-type,x-buffer-token'
      }
    });
  }
  return routeBuffer(context);
};
