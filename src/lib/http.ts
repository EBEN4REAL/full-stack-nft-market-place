export async function postJSON<T>(
    url: string,
    payload: unknown,
    init?: RequestInit
  ): Promise<T> {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      ...init,
    });
    if (!res.ok) throw new Error(`POST ${url} → ${res.status}`);
    return res.json() as Promise<T>;
  }
  