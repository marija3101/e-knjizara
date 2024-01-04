import React from "react";
import {
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const BookDetail = (props) => {
  const history = useHistory();
  const [loading, setLoading] =
    useState(true);
  const [book, setBook] = useState([]);
  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {
    let isMounted = true;
    const author_slug =
      props.match.params.author;
    const book_slug =
      props.match.params.book;
    axios
      .get(
        `/api/viewbookdetail/${author_slug}/${book_slug}`
      )
      .then((res) => {
        if (isMounted) {
          if (res.data.status === 200) {
            setBook(res.data.book);
            setLoading(false);
          } else if (
            res.data.status === 404
          ) {
            history.push(
              "/collections"
            );
            swal(
              "Warning",
              res.data.message,
              "error"
            );
          }
        }
      });
    return () => {
      isMounted = false;
    };
  }, [
    props.match.params.author,
    props.match.params.book,
    history,
  ]);

  const handleDec = () => {
    if (quantity > 1) {
      setQuantity(
        (prevCount) => prevCount - 1
      );
    }
  };

  const handleInc = () => {
    if (quantity < 10) {
      setQuantity(
        (prevCount) => prevCount + 1
      );
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    const data = {
      book_id: book.id,
      book_qty: quantity,
    };
    axios
      .post(`/api/add-to-cart`, data)
      .then((res) => {
        if (res.data.status === 201) {
          swal(
            "Success",
            res.data.message,
            "success"
          );
        } else if (
          res.data.status === 409
        ) {
          swal(
            "Warning",
            res.data.message,
            "warning"
          );
        } else if (
          res.data.status === 401
        ) {
          swal(
            "Error",
            res.data.message,
            "error"
          );
        } else if (
          res.data.status === 404
        ) {
          swal(
            "Warning",
            res.data.message,
            "warning"
          );
        }
      });
  };

  if (loading) {
    return (
      <h4>Loading Book Detail...</h4>
    );
  } else {
    var avail_stock = "";
    if (book.quantity > 0) {
      avail_stock = (
        <div>
          <label className="btn-sm btn-success px-4 mt-2">
            In stock
          </label>
          <div className="row">
            <div className="col-md-3 mt-3">
              <div className="input-group">
                <button
                  type="button"
                  onClick={handleDec}
                  className="input-group-text"
                >
                  -
                </button>
                <div className="form-control text-center">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={handleInc}
                  className="input-group-text"
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={addToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      avail_stock = (
        <div>
          <label className="btn-sm btn-danger px-4 mt-2">
            Out of stock
          </label>
        </div>
      );
    }
  }

  return (
    <div>
      <div
        className="py-3"
        style={{
          backgroundColor: "#ffd9b3",
        }}
      >
        <div className="container">
          <h6>
            Books / {book.author.name} /{" "}
            {book.title}
          </h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 border-end">
              <img
                src={`http://127.0.0.1:8000/${book.image}`}
                alt={book.title}
                className="w-100"
              />
            </div>
            <div className="col-md-8">
              <h4>
                {book.title}
                <span className="float-end badge btn-sm btn-danger badge-pil">
                  {book.language}
                </span>
              </h4>
              <p>{book.description}</p>
              <h4 className="mb-1">
                {book.price} RSD
              </h4>
              <div>{avail_stock}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
