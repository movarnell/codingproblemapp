module.exports = {
  apps: [
    {
      name: "code_problems",
      script: "./index.mjs",
      interpreter: "node",
      interpreter_args: "--experimental-modules",
      watch: true,
    },
  ],
};