import { API_BASE_URL } from "./config";

export class ApiError extends Error {
  status: number;
  bodyText?: string;

  constructor(message: string, status: number, bodyText?: string) {
    super(message);
    this.status = status;
    this.bodyText = bodyText;
  }
}

async function readErrorMessage(res: Response) {
  try {
    const text = await res.text();
    if (text) {
      const json = JSON.parse(text);
      if (json.detail) {
        return typeof json.detail === 'string' ? json.detail : JSON.stringify(json.detail);
      }
      return text;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { accessToken?: string } = {}
): Promise<T> {
  const { accessToken, headers, ...rest } = init;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    const errorMsg = await readErrorMessage(res);
    throw new ApiError(errorMsg || `Request failed: ${res.status}`, res.status, errorMsg);
  }

  // if backend returns empty body sometimes
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}