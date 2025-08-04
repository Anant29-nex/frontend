const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI(
  path: string,
  method = "GET",
  body?: any,
  token?: string
) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API error");
  return data;
}
