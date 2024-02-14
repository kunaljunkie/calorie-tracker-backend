const { parentPort } = require('worker_threads');

parentPort.on('message', (message) => {
  // Process the message received from the main thread
  const result = message + 1;

  // Send the result back to the main thread
  parentPort.postMessage(result);
});
