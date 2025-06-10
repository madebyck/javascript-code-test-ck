class BookService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async findBooks(criteria) {
    return await this.apiClient.searchBooks(criteria);
  }
}

module.exports = BookService;
