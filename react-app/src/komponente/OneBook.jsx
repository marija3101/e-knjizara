import React from "react";
import { BsCartPlus } from "react-icons/bs";
const OneBook = ({
  books,
  addToCart,
  inCart,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {books.title}
        </h5>
        <p className="card-text">
          {books.description}
        </p>
        <a
          href="#"
          className="btn btn-primary"
          onClick={() =>
            addToCart(
              books.title,
              books.id
            )
          }
        >
          {inCart === 1 ? (
            <BsCartPlus />
          ) : (
            <h4>
              Amount: {books.amount}
            </h4>
          )}
        </a>
      </div>
      <div className="card-footer text-muted">
        {books.user.name}
      </div>
    </div>
  );
};

export default OneBook;
