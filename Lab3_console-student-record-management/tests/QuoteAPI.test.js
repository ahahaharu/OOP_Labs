const QuoteApiAdapter = require("../infrastructure/adapters/QuoteApiAdapter");
const QuoteDTO = require("../dto/QuoteDTO");
const fetch = require("node-fetch");

jest.mock("node-fetch");

describe("QuoteApiAdapter", () => {
  let quoteApiAdapter;

  beforeEach(() => {
    jest.clearAllMocks();
    quoteApiAdapter = new QuoteApiAdapter();
  });

  describe("getRandomQuote", () => {
    it("should fetch a quote from the API and convert it to QuoteDTO", async () => {
      const mockQuoteData = [
        {
          quote: "All bad things must come to an end.",
          author: "Walter White",
        },
      ];

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockQuoteData),
      };

      fetch.mockResolvedValue(mockResponse);

      const result = await quoteApiAdapter.getRandomQuote();

      expect(fetch).toHaveBeenCalledWith(
        "https://api.breakingbadquotes.xyz/v1/quotes"
      );
      expect(result).toBeInstanceOf(QuoteDTO);
      expect(result.content).toBe("All bad things must come to an end.");
      expect(result.author).toBe("Walter White");
    });

    it("should return a fallback quote when API call fails", async () => {
      const originalConsoleError = console.error;
      console.error = jest.fn();

      fetch.mockRejectedValue(new Error("Network error"));

      const result = await quoteApiAdapter.getRandomQuote();

      expect(fetch).toHaveBeenCalledWith(
        "https://api.breakingbadquotes.xyz/v1/quotes"
      );
      expect(result).toBeInstanceOf(QuoteDTO);
      expect(result.content).toBe("All bad things must come to an end.");
      expect(result.author).toBe("Walter White");

      console.error = originalConsoleError;
    });
  });
});
