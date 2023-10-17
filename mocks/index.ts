import { SetupServer } from "msw/node";
async function initMocks() {
  if (typeof window === "undefined") {
    const { server } = require("./server") as { server: SetupServer };
    require("@testing-library/jest-dom");

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    server.listen();
  } else {
    const { worker } = require("./browser");
    worker.start();
  }
}

initMocks();

export {};
