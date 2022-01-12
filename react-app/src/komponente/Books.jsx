import React from "react";
import axios from "axios";
import OneBook from "./OneBook";
import {
  useState,
  useEffect,
} from "react";
import NavBar from "./NavBar";

const Books = ({
  books,
  addToCart,
}) => {
  return (
    <div>
      <NavBar />
      <h3>Books:</h3>
      {books == null ? (
        <></>
      ) : (
        books.map((books) => (
          <OneBook
            books={books}
            key={books.id}
            addToCart={addToCart}
            inCart={1}
          />
        ))
      )}
    </div>
  );
};

export default Books;
