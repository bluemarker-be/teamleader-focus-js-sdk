/**
 * Creates a mock fetch function that returns a predefined response.
 */
export function mockFetch(
  response: {
    status?: number;
    body?: unknown;
    headers?: Record<string, string>;
  } = {},
) {
  const {
    status = 200,
    body = { data: [] },
    headers = { "content-type": "application/json" },
  } = response;

  const calls: Array<{ url: string; init: RequestInit }> = [];

  const fetchFn = async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: url.toString(), init: init ?? {} });
    return new Response(
      status === 204 ? null : JSON.stringify(body),
      {
        status,
        headers: new Headers(headers),
      },
    );
  };

  return { fetchFn: fetchFn as typeof globalThis.fetch, calls };
}

/**
 * Creates a mock fetch that returns different responses per call.
 */
export function mockFetchSequence(
  responses: Array<{
    status?: number;
    body?: unknown;
    headers?: Record<string, string>;
  }>,
) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  let callIndex = 0;

  const fetchFn = async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: url.toString(), init: init ?? {} });
    const response = responses[callIndex] ?? responses[responses.length - 1]!;
    callIndex++;
    return new Response(
      response.status === 204 ? null : JSON.stringify(response.body ?? { data: [] }),
      {
        status: response.status ?? 200,
        headers: new Headers({
          "content-type": "application/json",
          ...(response.headers ?? {}),
        }),
      },
    );
  };

  return { fetchFn: fetchFn as typeof globalThis.fetch, calls };
}
