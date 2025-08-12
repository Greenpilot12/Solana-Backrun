import fetch from 'node-fetch';
export async function fetchSolPriceUSD(): Promise<number> {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd', { timeout: 5000 });
    if (!res.ok) throw new Error('Price fetch failed');
    const json = await res.json();
    return (json?.solana?.usd) ? json.solana.usd : 180.73;
  } catch (e) {
    console.warn('fetchSolPriceUSD failed, using fallback 180.73', e?.message);
    return 180.73;
  }
}
