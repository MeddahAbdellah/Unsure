import { Unsure, configGlobalUnsure } from "../src/index";
jest.setTimeout(6000 * 1000);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('FlatMapTo', () => {
  beforeAll(() => {
    const groqApiKey = process.env['GROQ_API_KEY'] as string;
    configGlobalUnsure({ groqApiKey });
  });

  test('should yield the correct value', async () => {
    expect(await Unsure("Amount: 200.23 $").flatMapTo("number")).toBe("200.23");
    expect(await Unsure("I am at 123 Main St, Springfield, IL 62704").flatMapTo("address")).toBe("123 main st, springfield, il 62704");
    expect(await Unsure("You can contact him at john.doe@example.com").flatMapTo("email")).toBe("john.doe@example.com");
    expect(await Unsure("Phone: +1-800-555-5555 (Customer Support)").flatMapTo("phone")).toBe("+1-800-555-5555");
    expect(await Unsure("Date of Birth: 2024-06-19").flatMapTo("date in the same format")).toBe("2024-06-19");
    expect(await Unsure("Status: active").flatMapTo("boolean")).toBe("true");
    expect(await Unsure("Status: _inactive)").flatMapTo("boolean")).toBe("false");
    expect(await Unsure("Response: {\"key\": \"should get this\"}").flatMapTo("key's value")).toEqual("should get this");
    expect(await Unsure("HTML Content: <html><body><div class=\"scrapable\">Target Content<div></body></html>").flatMapTo("contain of the div with the class scrapable")).toBe("target content");
    expect(await Unsure("Favorite Color: #FF5733").flatMapTo("color in hex")).toBe("#ff5733");
    await wait(30000);
    expect(await Unsure("Order Total: 12345 USD").flatMapTo("price")).toBe("12345");
    expect(await Unsure("Temperature Reading: 98.6°F (normal)").flatMapTo("temperature")).toBe("98.6");
    expect(await Unsure("Success: operation completed successfully").flatMapTo("boolean")).toBe("true");
    expect(await Unsure("Failure: operation failed").flatMapTo("boolean")).toBe("false");
    expect(await Unsure("Error Code: 404 - Not Found").flatMapTo("status")).toBe("404");
    expect(await Unsure("Emergency Contact: +44 20 7946 0958 (London)").flatMapTo("phone trimmed with no spaces keeping the +")).toBe("+442079460958");
    expect(await Unsure("Emergency Contact: +44 20 7946 0958 (London)").flatMapTo("phone trimmed with no spaces keeping the +")).toBe("+442079460958");
    expect(await Unsure("Answer: 42 (the meaning of life)").flatMapTo("number")).toBe("42");
    expect(await Unsure("Name: Jane Doe (Guest)").flatMapTo("preson's name")).toBe("jane doe");
    expect(await Unsure("Name: Jane Doe (Guest)").flatMapTo("role")).toBe("guest");
    expect(await Unsure("Selected Color: rgb(255, 99, 71)").flatMapTo("color in Hex")).toBe("#ff6347");
  });
});