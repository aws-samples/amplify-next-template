/*
  See https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads for
  examples of payloads.

  Try running in the console below.
*/

exports = function(payload) {
  return payload.pull_request && payload.action === 'opened';
};