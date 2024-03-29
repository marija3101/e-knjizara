import React from "react";
import {
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pusher from "pusher-js";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const BookDetail = (props) => {
  const [
    commentInput,
    setCommentInput,
  ] = useState({
    book_id: "",
    raiting: "",
    comment: "",
  });

  const [viewBook, setViewBook] =
    useState([]);
  useEffect(() => {
    axios
      .get("/api/view-book")
      .then((res) => {
        if (res.data.status === 200) {
          setViewBook(res.data.books);
        }
      });
  }, []);

  const handleInput = (e) => {
    e.persist();
    setCommentInput({
      ...commentInput,
      [e.target.name]: e.target.value,
    });
  };

  const submitComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "book_id",
      commentInput.book_id
    );
    formData.append(
      "raiting",
      commentInput.raiting
    );

    formData.append(
      "comment",
      commentInput.comment
    );

    axios
      .post(
        "/api/store-comment",
        formData
      )
      .then((res) => {
        if (res.data.status === 200) {
          swal(
            "success",
            res.data.message,
            "success"
          );
          setCommentInput({
            ...commentInput,
            book_id: "",
            raiting: "",
            comment: "",
          });
        } else if (
          res.data.status === 422
        ) {
          swal(
            "All fields are mandetory",
            "",
            "error"
          );
        }
      });
  };

  const [
    currentValue,
    setCurrentValue,
  ] = useState(0);
  const [hoverValue, setHoverValue] =
    useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (
    newHoverValue
  ) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300,
    },
    button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
    },
  };

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
            sendCom(res.data.book);
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

  const [qty, setQty] = useState([]);
  let newQty = [];

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(
      "9a7e01dfd922157437b7",
      {
        cluster: "eu",
      }
    );

    const channel =
      pusher.subscribe("quantity");
    channel.bind(
      "message",
      function (data) {
        newQty.push(data);
        setQty(newQty);
      }
    );
  }, []);

  const addToCart = (event) => {
    event.preventDefault();
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

  const func1 = async (e) => {
    e.preventDefault();
    const data = {
      book_id: book.id,
      book_qty: quantity,
    };

    await fetch(
      "http://localhost:8000/api/messages",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      }
    );
  };

  const [com, setCom] = useState([]);

  const sendCom = (data) => {
    axios
      .get(
        `/api/view-comment/${data.id}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          setCom(res.data.comment);
        } else if (
          res.data.status === 401
        ) {
          swal(
            "Warning",
            res.data.message,
            "error"
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
                onClick={function (
                  event
                ) {
                  func1(event);
                  addToCart(event);
                }}
                //onClick={addToCart}
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

  var viewbooks_HTMLTABLE = "";

  viewbooks_HTMLTABLE = viewBook.map(
    (item, idx) => {
      return (
        <>
          {item.genre_id ==
            book.genre_id &&
          item.id != book.id ? (
            <>
              <div
                className="col-md-2"
                key={idx}
              >
                <div
                  className="card"
                  style={{
                    position: "inherit",
                  }}
                >
                  <Link
                    to={`/collections/${item.author.slug}/${item.slug}`}
                  >
                    <img
                      src={`http://localhost:8000/${item.image}`}
                      className="w-100"
                      alt={item.title}
                    />
                  </Link>
                  <div className="card-body">
                    <Link
                      to={`/collections/${item.author.slug}/${item.slug}`}
                      style={{
                        textDecoration:
                          "none",
                        color: "black",
                        textAlign:
                          "center",
                      }}
                    >
                      <h5>
                        {item.title}
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {/*</div>*/}
        </>
      );
    }
  );

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
                  {book.author.name}
                </span>
              </h4>
              <h5 className="badge btn-sm btn-info badge-pil">
                Genre: {book.genre.name}
              </h5>
              <p>{book.description}</p>

              <div className="row justify-content-between">
                <div className="col-8">
                  <h4 className="mb-1">
                    {book.price} RSD
                  </h4>
                  <div>
                    {avail_stock}
                  </div>
                  <div
                    style={
                      styles.container
                    }
                  ></div>
                </div>

                {/*     <div className="col-2">
                  <div className="row justify-content-end">
                    <p
                      className="badge btn-sm btn-info badge-pil "
                      style={{
                        fontSize:
                          "15px",
                      }}
                    >
                      Language:{" "}
                      {book.language}
                    </p>

                    <p
                      className="badge btn-sm btn-info badge-pil "
                      style={{
                        fontSize:
                          "15px",
                      }}
                    >
                      Cover:{" "}
                      {book.cover}
                    </p>
                  </div>
                </div> */}

                <hr
                  style={{
                    marginTop: "10px",
                  }}
                ></hr>

                <div className="col-md-3 mt-3">
                  <form
                    onSubmit={
                      submitComment
                    }
                    style={
                      styles.container
                    }
                  >
                    <div
                      style={
                        styles.stars
                      }
                    >
                      {stars.map(
                        (_, index) => {
                          return (
                            <FaStar
                              key={
                                index
                              }
                              size={24}
                              onClick={() =>
                                handleClick(
                                  index +
                                    1
                                )
                              }
                              onMouseOver={() =>
                                handleMouseOver(
                                  index +
                                    1
                                )
                              }
                              onMouseLeave={
                                handleMouseLeave
                              }
                              color={
                                (hoverValue ||
                                  currentValue) >
                                index
                                  ? colors.orange
                                  : colors.grey
                              }
                              style={{
                                marginRight: 10,
                                cursor:
                                  "pointer",
                              }}
                            />
                          );
                        }
                      )}
                    </div>
                    <input
                      type="text"
                      name="raiting"
                      value={
                        (commentInput.raiting =
                          currentValue)
                      }
                      onChange={
                        handleInput
                      }
                      style={{
                        opacity: 0,
                        width: "0px",
                        height: "0px",
                      }}
                    />
                    <textarea
                      placeholder="What's your experience?"
                      style={
                        styles.textarea
                      }
                      name="comment"
                      onChange={
                        handleInput
                      }
                      value={
                        commentInput.comment
                      }
                      className="form-control"
                    />

                    <input
                      name="book_id"
                      onChange={
                        handleInput
                      }
                      value={
                        (commentInput.book_id =
                          book.id)
                      }
                      style={{
                        opacity: 0,
                        width: "0px",
                        height: "0px",
                      }}
                    />

                    <button
                      style={
                        styles.button
                      }
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
              <hr />
              {com != "" ? (
                <>
                  <div
                    style={{
                      marginLeft:
                        "10px",
                    }}
                  >
                    Other comments:
                  </div>

                  {com.map((c, idx) => {
                    return (
                      <div
                        className="card"
                        style={{
                          width:
                            "18rem",
                        }}
                        key={idx}
                      >
                        <div className="card-body">
                          {Array.from(
                            {
                              length:
                                c.raiting,
                            },
                            (_, i) => (
                              <FaStar
                                size={
                                  10
                                }
                                style={{
                                  color:
                                    "#FFBA5A",
                                }}
                                key={i}
                              />
                            )
                          )}
                          <p className="card-text">
                            {c.comment}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>No comments yet.</>
              )}
            </div>
            <div className="py-3">
              <div className="container">
                <hr />
                <div className="row">
                  <h3
                    style={{
                      textAlign:
                        "center",
                      color: "grey",
                    }}
                  >
                    Similar products:
                  </h3>

                  {viewbooks_HTMLTABLE}
                </div>
              </div>
            </div>

            <div className="container">
              <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div
                  className="list-group list-group-flush broder-bottom scrollarea"
                  style={{
                    minHeight: "500px",
                    padding: "10px",
                  }}
                >
                  {qty.map((q) => {
                    book.quantity =
                      book.quantity -
                      q.data.book_qty;
                    {
                      return <></>;
                      /*  return (
                      <div className="list-group-item list-group-item-action py-3 lh-tight">
                        <div className="d-flex w-100 align-items-center justify-content-between">
                          <strong className="mb-1">
                            {book.quantity -
                              q.data
                                .book_qty}
                          </strong>
                        </div>
                      </div>
                    );*/
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
