import "@testing-library/jest-dom";
import "whatwg-fetch";
import { server } from "./mocks/server";

//stablishes API mocking before all tests
beforeAll(() => server.listen());
//reset any request handlers added during testing
afterEach(() => server.resetHandlers());
//clean up after the test have been finished
afterAll(() => server.close());
