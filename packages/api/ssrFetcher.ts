interface ISsrApiFetcher {
  get: (args: { url: string }) => Promise<any>;
  post: (args: { url: string; body: any }) => Promise<any>;
}

const BASE_URL = process.env.API_URL;

const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(BASE_URL + url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        // Authorization: "Bearer " + cookies().get("token")?.value,
        // next-headers에서 cookies를 가져와서 사용.
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    throw e;
  }
};

export const ssrApiFetcher: ISsrApiFetcher = {
  get: ({ url }) => fetchWithToken(url, { cache: "no-store" }),
  post: ({ url, body }) =>
    fetchWithToken(url, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    }),
};
