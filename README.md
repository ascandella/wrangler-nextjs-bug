## Repro case for Wrangler / Next.js / HMR bug

This repository is to show the bug I am running into when running Wrangler
locally to proxy requests to Next.js.

The bug I am running into is that any time the Next.js server is restarted, the
Cloudflare worker immediately hangs, but does not exit. I see something like the
following in my logs:

```
/Users/aiden/src/wrangler-nextjs-bug/node_modules/ws/lib/sender.js:162
      throw new TypeError('First argument must be a valid error code number');
            ^
TypeError: First argument must be a valid error code number
    at Sender.close (/Users/aiden/src/wrangler-nextjs-bug/node_modules/ws/lib/sender.js:162:13)
    at WebSocket.close (/Users/aiden/src/wrangler-nextjs-bug/node_modules/ws/lib/websocket.js:300:18)
    at /Users/aiden/src/wrangler-nextjs-bug/node_modules/@miniflare/web-sockets/src/couple.ts:51:12
    at /Users/aiden/src/wrangler-nextjs-bug/node_modules/@miniflare/shared/src/event.ts:29:9
    at /Users/aiden/src/wrangler-nextjs-bug/node_modules/@miniflare/web-sockets/src/websocket.ts:92:27
    at AsyncLocalStorage.run (node:async_hooks:327:14)
    at RequestContext.runWith (/Users/aiden/src/wrangler-nextjs-bug/node_modules/@miniflare/shared/src/context.ts:134:34)
    at EventTarget.<anonymous> (/Users/aiden/src/wrangler-nextjs-bug/node_modules/@miniflare/web-sockets/src/webs
✘ [ERROR] Miniflare process exited with code 1


Miniflare process exited with code 1
```

Which leaves the wrangler process unavailable to process further requests.
