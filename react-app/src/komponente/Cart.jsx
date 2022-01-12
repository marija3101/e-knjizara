import React from "react";
import OneBook from "./OneBook";

const Cart = ({ books }) => {
  return (
    <div>
      <h3>♥♥♥</h3>
      {books.map((books) => (
        <OneBook
          books={books}
          key={books.id}
          inCart={0}
        />
      ))}
    </div>
  );
};

export default Cart;
