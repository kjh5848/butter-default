export const jsonResponse = (data: unknown, status = 200, headers?: HeadersInit) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...(headers || {})
    }
  });

export const errorResponse = (message: string, status = 400, code = 'Error') =>
  jsonResponse({ error: code, message }, status);
