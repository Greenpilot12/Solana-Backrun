import fetch from 'node-fetch';
const LAMPORTS_PER_SOL = 1e9;
export type TipPolicy = {
  tipFraction: number;
  minTipSol: number;
  maxTipSol: number;
  jitoTipFloorEndpoint?: string | null;
};
export function solToLamports(sol: number): number { return Math.round(sol * LAMPORTS_PER_SOL); }
export function lamportsToSol(lamports: number): number { return lamports / LAMPORTS_PER_SOL; }
export async function fetchTipFloor(jitoTipFloorEndpoint?: string | null): Promise<number | null> {
  if (!jitoTipFloorEndpoint) return null;
  try {
    const res = await fetch(jitoTipFloorEndpoint, { method: 'GET', timeout: 3000 });
    if (!res.ok) return null;
    const json = await res.json();
    const val = json.floorLamports ?? json.tipFloorLamports ?? json.recommendedLamports ?? json.floor;
    if (typeof val === 'number') return val;
    return null;
  } catch (err) { return null; }
}
export async function calculateTipLamports(expectedProfitUSD: number, solPriceUSD: number, policy: TipPolicy, jitoTipFloorEndpoint?: string | null): Promise<number> {
  const tipUsdByFraction = expectedProfitUSD * policy.tipFraction;
  const tipSolByFraction = tipUsdByFraction / solPriceUSD;
  const minTipSol = policy.minTipSol;
  const maxTipSol = policy.maxTipSol;
  const floorLamports = await fetchTipFloor(jitoTipFloorEndpoint);
  const floorSol = floorLamports ? lamportsToSol(floorLamports) : 0;
  let chosenTipSol = Math.max(tipSolByFraction, minTipSol, floorSol);
  chosenTipSol = Math.min(chosenTipSol, maxTipSol);
  return solToLamports(chosenTipSol);
}
