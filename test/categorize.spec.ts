import { Unsure, configGlobalUnsure } from "../src/index";
jest.setTimeout(6000 * 1000);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Categorize', () => {
  beforeAll(() => {
    const groqApiKey = process.env['GROQ_API_KEY'] as string;;
    configGlobalUnsure({ groqApiKey });
  });

  test('should yield the correct value', async () => {
    expect(await Unsure("Lion").categorize(["strong", "weak"])).toBe("strong");
    expect(await Unsure("Donkey").categorize(["strong", "weak"])).toBe("weak");
    expect(await Unsure("Tiger").categorize(["strong", "weak"])).toBe("strong");
    expect(await Unsure("Rabbit").categorize(["strong", "weak"])).toBe("weak");
    expect(await Unsure("Elephant").categorize(["strong", "weak"])).toBe("strong");
    expect(await Unsure("Mouse").categorize(["strong", "weak"])).toBe("weak");
    // Testing categorization based on size
    expect(await Unsure("Elephant").categorize(["large", "small"])).toBe("large");
    expect(await Unsure("Mouse").categorize(["large", "small"])).toBe("small");
    expect(await Unsure("Whale").categorize(["large", "small"])).toBe("large");
    expect(await Unsure("Ant").categorize(["large", "small"])).toBe("small");
    await wait(30000);
    // Testing categorization based on color
    expect(await Unsure("Sky").categorize(["blue", "green"])).toBe("blue");
    expect(await Unsure("Grass").categorize(["blue", "green"])).toBe("green");
    expect(await Unsure("Ocean").categorize(["blue", "green"])).toBe("blue");
    expect(await Unsure("Tree").categorize(["blue", "green"])).toBe("green");
    // Testing categorization based on taste
    expect(await Unsure("Chocolate").categorize(["sweet", "salty"])).toBe("sweet");
    expect(await Unsure("Pretzel").categorize(["sweet", "salty"])).toBe("salty");
    expect(await Unsure("Candy").categorize(["sweet", "salty"])).toBe("sweet");
    expect(await Unsure("Chips").categorize(["sweet", "salty"])).toBe("salty");
    await wait(30000);
    // Testing categorization based on temperature
    expect(await Unsure("Ice").categorize(["hot", "cold"])).toBe("cold");
    expect(await Unsure("Coffee").categorize(["hot", "cold"])).toBe("hot");
    expect(await Unsure("Lava").categorize(["hot", "cold"])).toBe("hot");
    expect(await Unsure("Snow").categorize(["hot", "cold"])).toBe("cold");
    // Testing categorization based on age
    expect(await Unsure("Grandmother").categorize(["old", "young"])).toBe("old");
    expect(await Unsure("Baby").categorize(["old", "young"])).toBe("young");
    expect(await Unsure("Teenager").categorize(["old", "young"])).toBe("young");
    expect(await Unsure("Senior Citizen").categorize(["old", "young"])).toBe("old");
  });
});