# JavaScript Code Test

### How to run:

1. Make sure you have Node.js v22 installed.
2. Run `npm install` to get dependencies.
3. Run `npm run start` to fetch books and see the output.
4. Run `npm test` to run the test suite.

---

## Assumptions/Comments

- This project assumes the JSON response from the book API will be an array where each item contains nested `book` and `stock` objects, structured as follows:

  ```json
  {
    "book": {
      "title": "Macbeth",
      "author": "William Shakespeare",
      "isbn": "123456789"
    },
    "stock": {
      "quantity": 5,
      "price": "6.99"
    }
  }
  ```

- The client maps this response to a simpler object containing only these properties:

  ```json
  {
    "title": "Macbeth",
    "author": "William Shakespeare",
    "isbn": "123456789",
    "quantity": 5,
    "price": "6.99"
  }
  ```