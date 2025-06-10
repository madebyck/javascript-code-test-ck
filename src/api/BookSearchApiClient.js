const { URLSearchParams } = require("url");

// Client to fetch books from the book-seller API
class BookSearchApiClient {
  constructor() {
    this.baseUrl = "http://api.book-seller-example.com";
  }

  async searchBooks(criteria) {
    // Build query parameters for the URL
    const params = new URLSearchParams();

    if (criteria.author) params.append("q", criteria.author);
    if (criteria.limit) params.append("limit", criteria.limit.toString()); // number to string
    if (criteria.publisher) params.append("publisher", criteria.publisher);
    if (criteria.year) params.append("year", criteria.year.toString());// number to string
    params.append("format", "json");

    // Construct URL with query parameters
    const url = `${this.baseUrl}/by-author?${params.toString()}`;

    try {
      // Fetch the data from the API
      const response = await fetch(url);

      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response body
      const json = await response.json();

      // Map the API data to an array of book objects
      return json.map((item) => ({
        title: item.book.title,
        author: item.book.author,
        isbn: item.book.isbn,
        quantity: item.stock.quantity,
        price: item.stock.price,
      }));
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BookSearchApiClient;
