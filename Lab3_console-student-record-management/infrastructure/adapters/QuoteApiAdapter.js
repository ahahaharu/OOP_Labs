const fetch = require("node-fetch");
const QuoteDTO = require("../../dto/QuoteDTO");

class QuoteApiAdapter {
  async getRandomQuote() {
    try {
      const response = await fetch(
        "https://api.breakingbadquotes.xyz/v1/quotes"
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // The API returns an array with a single quote object
      if (data && data.length > 0) {
        const quoteData = data[0];
        return new QuoteDTO(quoteData.quote, quoteData.author);
      } else {
        throw new Error("No quotes returned from API");
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      return new QuoteDTO(
        "All bad things must come to an end.",
        "Walter White"
      );
    }
  }
}

module.exports = QuoteApiAdapter;
