const express = require('express');
const app = express();
const PORT = process.env.BRIDGE_NODE_PORT || 3000;

app.get('/status', (req, res) => {
  res.json({
    nodeId: require('../config/node.config.json').nodeId,
    status: "running",
    timestamp: Date.now()
  });
});

app.listen(PORT, () => {
  console.log(`🌐 Status server running on http://localhost:${PORT}/status`);
});
