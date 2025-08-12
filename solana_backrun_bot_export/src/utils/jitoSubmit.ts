import fetch from 'node-fetch';
export type JitoSubmitOpts = { endpoint: string; apiKey?: string | null; maxRetries?: number; retryBaseMs?: number; };
export async function submitToJito(payload: any, opts: JitoSubmitOpts) {
  const maxRetries = opts.maxRetries ?? 3;
  const baseMs = opts.retryBaseMs ?? 200;
  let lastErr: any = null;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const headers: any = { 'Content-Type': 'application/json' };
      if (opts.apiKey) headers['Authorization'] = `Bearer ${opts.apiKey}`;
      const res = await fetch(opts.endpoint, { method: 'POST', headers, body: JSON.stringify(payload), timeout: 10000 });
      if (!res.ok) {
        const text = await res.text();
        lastErr = new Error(`Jito submit failed: ${res.status} ${text}`);
      } else {
        const json = await res.json();
        return { ok: true, data: json };
      }
    } catch (err) { lastErr = err; }
    await new Promise((r) => setTimeout(r, baseMs * Math.pow(2, attempt)));
  }
  return { ok: false, error: lastErr };
}
