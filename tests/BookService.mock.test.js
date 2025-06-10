const BookSearchApiClient = require("../src/api/BookSearchApiClient");
const BookService = require("../src/services/BookService");

describe("BookService with mocked BookSearchApiClient", () => {
  // Mock response data as API would return
  const mockApiResponse = [
    {
      book: {
        title: "Hamlet",
        author: "Shakespeare",
        isbn: "1234567890",
      },
      stock: {
        quantity: 12,
        price: 15.99,
      },
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches books by author and maps them correctly", async () => {
    const client = new BookSearchApiClient();
    const service = new BookService(client);
    const criteria = { author: "Shakespeare", limit: 1 };
    const books = await service.findBooks(criteria);

    expect(books).toHaveLength(1);
    expect(books[0]).toEqual({
      title: "Hamlet",
      author: "Shakespeare",
      isbn: "1234567890",
      quantity: 12,
      price: 15.99,
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("q=Shakespeare"));
  });
});
