module.exports = {
  apps: [
    {
      name: "solana-backrun-bot",
      script: "dist/index.js",
      interpreter: "node",
      cwd: "./",
      watch: false,
      env: {
        NODE_ENV: "production"
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      merge_logs: true,
    },
  ],
};
