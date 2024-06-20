import { Unsure, configGlobalUnsure } from "../src/index";
jest.setTimeout(6000 * 1000);

// const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('FlatMapTo', () => {
  beforeAll(() => {
    const groqApiKey = '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';
    configGlobalUnsure({ groqApiKey });
  });

  test('should yield the correct value', async () => {
    expect(await Unsure("Amount: 200.23 $").mapTo("number").mapTo("integer").flat()).toBe("200");
  });
});