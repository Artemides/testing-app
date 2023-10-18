import { SetupServer } from "msw/node";
async function initMocks() {
  if (typeof window === "undefined") {
    const { server } = require("./server") as { server: SetupServer };
    server.listen();
  } else {
    const { worker } = require("./browser");
    worker.start();
  }
}

initMocks();
