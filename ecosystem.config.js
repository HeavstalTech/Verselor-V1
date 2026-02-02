module.exports = {
  apps: [{
    name: "verselor-v1",
    script: "./index.js",
    watch: false,
    max_memory_restart: '1024M',
    instances: 1,
    exec_mode: "fork"
  }]
};