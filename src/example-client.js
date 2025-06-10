const BookSearchApiClient = require("./api/BookSearchApiClient");
const BookService = require("./services/BookService");

// Main function to run the example
async function run() {

  // Create a new API client instance
  const apiClient = new BookSearchApiClient();

  // Create the BookService using the API client
  const bookService = new BookService(apiClient);

  try {
    const books = await bookService.findBooks({
      author: "Shakespeare",
      limit: 10,
    });

    // Print the list of books found
    console.log("Books by Shakespeare:");
    books.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title} - ${book.author} (${book.isbn})`);
    });
  } catch (err) {
    console.error("Error fetching books:", err);
  }
}

run();