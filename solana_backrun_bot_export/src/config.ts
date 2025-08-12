export const RPC_URL = process.env.ERPC_URL || process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
export const JITO_ENDPOINT = process.env.JITO_ENDPOINT || 'https://relay.jito.wtf/v1/submit_bundle';
export const JITO_API_KEY = process.env.JITO_API_KEY || '';
export const TIP_FRACTION = parseFloat(process.env.TIP_FRACTION || '0.02');
export const MIN_TIP_SOL = parseFloat(process.env.MIN_TIP_SOL || '0.001');
export const MAX_TIP_SOL = parseFloat(process.env.MAX_TIP_SOL || '0.5');
export const TIP_RETRY_ATTEMPTS = parseInt(process.env.TIP_RETRY_ATTEMPTS || '3');
export const TIP_RETRY_BASE_MS = parseInt(process.env.TIP_RETRY_BASE_MS || '200');
