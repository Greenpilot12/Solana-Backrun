# Solana Backrun Bot (Export)

This is a minimal packaged export of the Solana backrun bot with:
- Dynamic tip scaling
- eRPC usage
- Jito private submission (mock-enabled)
- Mock-run script for safe simulation (100 SOL flashloan example)

## Quickstart (local & safe)

1. Copy `.env.example` -> `.env` and fill values (ERPC_URL, JITO_ENDPOINT, etc.)
2. Install deps:
   ```
   npm install
   ```
3. Run mock simulation (safe; does not send transactions):
   ```
   npm run mock
   ```

## Production notes
- The included Jito submission helper is wired into the executor. For safety the mockRun uses `testMode` and will **not** actually submit to Jito unless you flip `TEST_MODE=false` in env and supply credentials.
- Test thoroughly on devnet/mainnet-fork before running on mainnet.

