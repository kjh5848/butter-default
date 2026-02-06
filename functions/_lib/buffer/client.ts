import { errorResponse } from '../http/response';
import type { Context, Env } from './types';

const API_BASE = 'https://api.bufferapp.com/1';

type ProxyOptions = {
  bufferPath: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';
};

export const getAccessToken = (request: Request, env: Env) => {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    return authHeader.slice('bearer '.length).trim();
  }

  const tokenHeader = request.headers.get('x-buffer-token');
  if (tokenHeader) return tokenHeader.trim();

  if (env.BUFFER_ACCESS_TOKEN) return env.BUFFER_ACCESS_TOKEN;

  return null;
};

export const proxyBuffer = async (context: Context, options: ProxyOptions) => {
  const { request, env } = context;
  const token = getAccessToken(request, env);

  if (!token) {
    return errorResponse(
      'Missing Buffer access token. Send Authorization: Bearer <token> or set BUFFER_ACCESS_TOKEN in the worker environment.',
      401,
      'Unauthorized'
    );
  }

  const headers = new Headers();
  const contentType = request.headers.get('content-type');
  const accept = request.headers.get('accept');

  if (contentType) headers.set('content-type', contentType);
  if (accept) headers.set('accept', accept);
  headers.set('authorization', `Bearer ${token}`);

  const init: RequestInit = {
    method: options.method,
    headers
  };

  if (options.method !== 'GET' && options.method !== 'HEAD') {
    init.body = request.body;
  }

  const bufferResponse = await fetch(`${API_BASE}${options.bufferPath}`, init);

  return new Response(bufferResponse.body, {
    status: bufferResponse.status,
    headers: bufferResponse.headers
  });
};
