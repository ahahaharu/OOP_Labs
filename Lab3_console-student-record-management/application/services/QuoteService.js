const QuoteFactory = require("../factories/QuoteFactory");

class QuoteService {
  constructor(quoteApiAdapter) {
    this.quoteApiAdapter = quoteApiAdapter;
    this.quoteFactory = new QuoteFactory();
  }

  async getRandomQuote() {
    const quoteDTO = await this.quoteApiAdapter.getRandomQuote();
    return this.quoteFactory.createQuote(quoteDTO);
  }
}

module.exports = QuoteService;
