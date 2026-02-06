import { errorResponse } from '../http/response';
import type { Context } from './types';
import { handleUser } from './handlers/user';
import {
  handleProfiles,
  handlePendingUpdates,
  handleSentUpdates,
  handleShuffleUpdates
} from './handlers/profiles';
import { handleCreateUpdate } from './handlers/updates';

export const normalizePathParam = (pathParam: string | string[] | undefined) => {
  if (!pathParam) return '';
  return Array.isArray(pathParam) ? pathParam.join('/') : pathParam;
};

export const routeBuffer = async (context: Context) => {
  const { request, params } = context;
  const url = new URL(request.url);
  const method = request.method.toUpperCase();
  const pathParam = normalizePathParam(params.path);
  const segments = pathParam.split('/').filter(Boolean);

  if (segments.length === 0) {
    return errorResponse(
      'Unknown Buffer API route. Check /api/buffer/user, /api/buffer/profiles, /api/buffer/updates/create, /api/buffer/profiles/:id/updates/pending, /sent, /shuffle.',
      404,
      'NotFound'
    );
  }

  if (segments[0] === 'user' && method === 'GET') {
    return handleUser(context);
  }

  if (segments[0] === 'profiles') {
    if (segments.length === 1 && method === 'GET') {
      return handleProfiles(context);
    }

    const profileId = segments[1];
    if (!profileId) {
      return errorResponse('Missing profile id.', 400, 'BadRequest');
    }

    if (segments[2] === 'updates') {
      const query = url.searchParams.toString();
      const queryString = query ? `?${query}` : '';

      if (segments[3] === 'pending' && method === 'GET') {
        return handlePendingUpdates(context, profileId, queryString);
      }

      if (segments[3] === 'sent' && method === 'GET') {
        return handleSentUpdates(context, profileId, queryString);
      }

      if (segments[3] === 'shuffle' && method === 'POST') {
        return handleShuffleUpdates(context, profileId);
      }
    }
  }

  if (segments[0] === 'updates' && segments[1] === 'create' && method === 'POST') {
    return handleCreateUpdate(context);
  }

  return errorResponse(
    'Unknown Buffer API route. Check /api/buffer/user, /api/buffer/profiles, /api/buffer/updates/create, /api/buffer/profiles/:id/updates/pending, /sent, /shuffle.',
    404,
    'NotFound'
  );
};
