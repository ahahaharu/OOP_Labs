const Quote = require("../../domain/models/Quote");

class QuoteFactory {
  createQuote(quoteDTO) {
    return new Quote(quoteDTO.content, quoteDTO.author);
  }
}

module.exports = QuoteFactory;
