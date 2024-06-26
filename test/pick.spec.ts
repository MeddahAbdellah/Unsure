import { Unsure, configGlobalUnsure } from "../src/index";
jest.setTimeout(6000 * 1000);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Pick', () => {
  beforeAll(() => {
    const groqApiKey = process.env['GROQ_API_KEY'] as string;
    configGlobalUnsure({ groqApiKey });
  });

  test('should yield the correct value', async () => {
    // Various formats for total amount
    expect(await Unsure("Total Amount: $200.23").pick("amount")).toBe("200.23");
    expect(await Unsure("200.23 USD").pick("amount")).toBe("200.23");
    expect(await Unsure("Amount Due: 200.23 dollars").pick("amount")).toBe("200.23");

    // Various formats for order ID
    expect(await Unsure("Order ID: 12345").pick("order id")).toBe("12345");
    expect(await Unsure("ID: 12345 for Order").pick("order id")).toBe("12345");
    expect(await Unsure("Order#12345").pick("order id")).toBe("12345");

    // Various formats for email
    expect(await Unsure("User Email: john.doe@example.com").pick("email")).toBe("john.doe@example.com");
    expect(await Unsure("Email: john.doe@example.com").pick("email")).toBe("john.doe@example.com");
    expect(await Unsure("Contact at john.doe@example.com").pick("email")).toBe("john.doe@example.com");
    await wait(30000);
    // Various formats for phone number
    expect(await Unsure("Contact Number: +1-800-555-5555").pick("phone number")).toBe("+1-800-555-5555");
    expect(await Unsure("Phone: +1-800-555-5555").pick("phone number")).toBe("+1-800-555-5555");
    expect(await Unsure("Call us at +1-800-555-5555").pick("phone number")).toBe("+1-800-555-5555");

    // Various formats for date
    expect(await Unsure("Date of Purchase: 2024-06-19").pick("date in YYYY-MM-DD format")).toBe("2024-06-19");
    expect(await Unsure("Purchase Date: 19th June 2024").pick("date in YYYY-MM-DD format")).toBe("2024-06-19");
    expect(await Unsure("2024/06/19").pick("date in YYYY-MM-DD format")).toBe("2024-06-19");

    // Various formats for status
    expect(await Unsure("Status: true (active)").pick("status")).toBe("true");
    expect(await Unsure("Active Status: true").pick("status")).toBe("true");
    expect(await Unsure("Account Status: Active").pick("status")).toBe("active");
    await wait(30000);
    // Various formats for number of items
    expect(await Unsure("Total Items: 15").pick("number of items")).toBe("15");
    expect(await Unsure("Items: 15").pick("number of items")).toBe("15");
    expect(await Unsure("You have 15 items").pick("number of items")).toBe("15");

    // Various formats for temperature
    expect(await Unsure("Temperature: 98.6°F").pick("temperature")).toBe("98.6");
    expect(await Unsure("Temp: 98.6°F").pick("temperature")).toBe("98.6");
    expect(await Unsure("98.6 degrees Fahrenheit").pick("temperature")).toBe("98.6");

    // Various formats for success status
    expect(await Unsure("Success: true").pick("success")).toBe("true");
    expect(await Unsure("Operation was successful: true").pick("success")).toBe("true");
    expect(await Unsure("Success status: true").pick("success")).toBe("true");
    await wait(30000);

    // Various formats for error code
    expect(await Unsure("Error Code: 404 - Not Found").pick("status code (the number)")).toBe("404");
    expect(await Unsure("404 Error").pick("status code (the number)")).toBe("404");
    expect(await Unsure("Error 404: Page Not Found").pick("status code (the number)")).toBe("404");

    // Various formats for address
    expect(await Unsure("Address: 123 Main St, Springfield, IL 62704").pick("address")).toBe("123 main st, springfield, il 62704");
    expect(await Unsure("123 Main Street, Springfield").pick("address")).toBe("123 main street, springfield");
    expect(await Unsure("Location: 123 Main St, Springfield").pick("address")).toBe("123 main st, springfield");

    // Various formats for user ID
    expect(await Unsure("User ID: 7890").pick("user id")).toBe("7890");
    expect(await Unsure("ID: 7890").pick("user id")).toBe("7890");
    expect(await Unsure("User#7890").pick("user id")).toBe("7890");
  });
});