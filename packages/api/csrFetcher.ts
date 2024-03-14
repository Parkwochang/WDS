interface IApiFetcher {
  post: (args: { url: string; body: any; headers?: any }) => Promise<any>;
  login: (args: { url: string; body: any; headers?: any }) => Promise<any>;
  file: (args: {
    url: string;
    body: any;
    headers?: any;
    method: "GET" | "PUT" | "POST" | "DELETE";
  }) => Promise<any>;
  get: (args: { url: string }) => Promise<any>;
  put: (args: { url: string; body: any }) => Promise<any>;
  delete: (args: { url: string; body: any }) => Promise<any>;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const getCookie = (name: any) => {
  const value = `; ${document.cookie}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
const getHeaders = (isJson = true) => ({
  ...(isJson ? { "Content-Type": "application/json" } : {}),
  Authorization: `Bearer ${getCookie("token")}`,
});
const checkStatus = (response: Response) => {
  if (response.ok) {
    return response;
  } else {
    var error = new Error(response.statusText);
    throw error;
  }
};

// caches : "force-cache"
// 캐시 데이터를 사용하면 NextJ는 빌드 시간에 실제 HTTP 요청을 한 번만 수행합니다. 다음에 페이지를로드 할 때 NextJs는 초기 데이터로 응답하고 요청을 다시 수행하지 않습니다. 이것은 빌드 시간에 데이터를 가져오는 것이 좋지만 데이터가 자주 변경되는 경우에는 좋지 않습니다.
// next : { revalidate: 10 }
// 변경되는 데이터가 있지만 지금은 매우 자주 사용하는 경우에 사용하십시오. 예를 들어, 15 분마다 블로그의 댓글을 새로 고치려고 할 수 있습니다.
// caches : "no-store"
// 데이터릉 동적으로 가져온다. 각 페이지로드에서 실시간으로 업데이트해야하는 데이터에이 기능을 사용하십시오. 예를 들어 이벤트에 사용할 수있는 좌석 수입니다.

const apiFetcher: IApiFetcher = {
  post: async ({ url, body }) => {
    const response = await fetch(BASE_URL + url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(checkStatus);

    return await response.json();
  },
  file: async ({ url, body, method }) => {
    const response = await fetch(url, {
      method: method,
      body: body,
      headers: getHeaders(false),
    }).then(checkStatus);

    return await response.json;
  },
  get: async ({ url }) => {
    const response = await fetch(url, {
      cache: "no-store",
      headers: getHeaders(),
    }).then(checkStatus);
    return await response.json();
  },
  put: async ({ url, body }) => {
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(checkStatus);
    return await response.json();
  },
  delete: async ({ url, body }) => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(checkStatus);
    return await response.json();
  },
  login: async ({ url, body }) => {
    const response = await fetch(BASE_URL + url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
      redirect: "manual",
    }).then(checkStatus);

    const token = response.headers.get("토큰명");

    return { data: await response.json(), token };
  },
};
