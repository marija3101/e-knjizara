import React from "react";
import {
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  var result = [];

  const [couponInput, setCoupon] =
    useState({
      couponName: "",
    });
  const submitCoupon = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "couponName",
      couponInput.couponName
    );

    axios
      .post(
        "/api/apply-coupon",
        formData
      )
      .then((res) => {
        if (res.data.status === 200) {
          result = res.data.discount;
          console.log(result);
          setTotal(result);
        } else if (
          res.data.statu === 404
        ) {
          swal(
            "Error",
            res.data.message,
            "error"
          );
        }
      });
  };
  var totalCartPrice = 0;

  const [total, setTotal] = useState(
    []
  );
  const dataToPass = {
    res: total,
  };

  const handleInput = (e) => {
    e.persist();
    setCoupon({
      ...couponInput,
      [e.target.name]: e.target.value,
    });
  };
  const history = useHistory();

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              book_qty:
                item.book_qty -
                (item.book_qty > 1
                  ? 1
                  : 0),
            }
          : item
      )
    );
    updateCartQuantity(cart_id, "dec");
  };
  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              book_qty:
                item.book_qty +
                (item.book_qty < 10 &&
                item.book.quantity != 0
                  ? 1
                  : 0),
            }
          : item
      )
    );

    updateCartQuantity(cart_id, "inc");
  };
  function updateCartQuantity(
    cart_id,
    scope
  ) {
    axios
      .put(
        `/api/cart-updatequantity/${cart_id}/${scope}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          /* swal(
            "Success",
            res.data.message,
            "success"
          );*/
        }
      });
  }

  const deleteCartItem = (
    e,
    cart_id
  ) => {
    e.preventDefault();
    setCart(
      cart.filter(
        (item) => cart_id !== item.id
      )
    );
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";
    axios
      .delete(
        `/api/delete-cartitem/${cart_id}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          swal(
            "Success",
            res.data.message,
            "success"
          );

          thisClicked
            .closest("tr")
            .remove();
        } else if (
          res.data.status === 404
        ) {
          swal(
            "Error",
            res.data.message,
            "error"
          );
          thisClicked.innerText =
            "Remove";
        }
      });
  };

  const [loading, setLoading] =
    useState(true);

  const [cart, setCart] = useState([]);

  if (
    !localStorage.getItem("auth_token")
  ) {
    history.push("/");
    swal(
      "Warning",
      "Login to go to Cart Page",
      "error"
    );
  }

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`/api/cart`)
      .then((res) => {
        if (isMounted) {
          if (res.data.status === 200) {
            setCart(res.data.cart);
            setLoading(false);
          } else if (
            res.data.status === 401
          ) {
            history.push("/");
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
  }, [history]);

  if (loading) {
    return (
      <h4>Loading Book Detail...</h4>
    );
  }
  var cart_HTML = "";
  if (cart.length > 0) {
    cart_HTML = (
      <div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Book</th>
                <th className="text-center>Price">
                  Price
                </th>
                <th className="text-center>Quantity">
                  Quantity
                </th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                totalCartPrice +=
                  item.book.price *
                  item.book_qty;

                return (
                  <tr key={idx}>
                    <td width="10%">
                      <img
                        src={`http://localhost:8000/${item.book.image}`}
                        alt={
                          item.book
                            .title
                        }
                        width="50px"
                        height="50px"
                      />
                    </td>
                    <td>
                      {item.book.title}
                    </td>
                    <td
                      width="15%"
                      className="text-center"
                    >
                      {item.book.price}{" "}
                      RSD
                    </td>
                    <td width="15%">
                      <div
                        className="input-group"
                        style={{
                          position:
                            "inherit",
                        }}
                      >
                        <button
                          type="button"
                          className="input-group-text"
                          onClick={() =>
                            handleDecrement(
                              item.id
                            )
                          }
                        >
                          -
                        </button>
                        <div
                          className="form-control text-center"
                          style={{
                            position:
                              "inherit",
                          }}
                        >
                          {
                            item.book_qty
                          }
                        </div>
                        <button
                          type="button"
                          className="input-group-text"
                          onClick={() =>
                            handleIncrement(
                              item.id
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td width="10%">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={(e) =>
                          deleteCartItem(
                            e,
                            item.id
                          )
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );

    <div className="row">
      <div className="col-md-8"></div>
      <div className="col-md-4">
        <div className="card card-body mt-3">
          <h4>
            Total:
            <span className="float-end">
              {total != 0
                ? { total }
                : { totalCartPrice }}
              {/*totalCartPrice*/} RSD
            </span>
          </h4>
          <hr />

          <Link
            to={{
              pathname: "/checkout",
              state: dataToPass,
            }}
            className="btn"
            style={{
              background: "#ffd9b3",
            }}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>;
  } else {
    cart_HTML = (
      <div>
        <div
          className="card card-body py-5 text-center shadow-sm"
          style={{
            position: "inherit",
          }}
        >
          <h4>
            Your Shopping Cart is Empty
          </h4>
        </div>
      </div>
    );
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
          <h6>Home / Cart</h6>
        </div>
      </div>
      <div
        style={{
          position: "revert",
        }}
      >
        <div className="row">
          <div className="col-md-12">
            {cart_HTML}
          </div>
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div
              className="card-body mt-3"
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "0",
                wordWrap: "break-word",
                backgroundColor: "#fff",
                backgroundClip:
                  "border-box",
                borderRadius: ".25rem",
              }}
            >
              <div className="form-check">
                <div className="summary-item">
                  <form
                    onSubmit={
                      submitCoupon
                    }
                    encType="multipart/form-data"
                  >
                    <p className="row-in-form">
                      <label htmlFor="coupon-code">
                        Enter your
                        loyalty coupon
                        code
                      </label>
                      <input
                        type="text"
                        style={{
                          borderStyle:
                            "solid",
                        }}
                        name="couponName"
                        onChange={
                          handleInput
                        }
                        value={
                          couponInput.couponName
                        }
                      />
                    </p>

                    <button
                      type="submit"
                      className="btn btn-primary px-4 mt-2"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
              <hr />
              <h4>
                Total:
                <span className="float-end">
                  {total != 0 ? (
                    <>{total}</>
                  ) : (
                    <>
                      {totalCartPrice}
                    </>
                  )}{" "}
                  RSD
                </span>
              </h4>
              <hr />
              {totalCartPrice != 0 ? (
                <>
                  <Link
                    to={{
                      pathname:
                        "/checkout",
                      state: dataToPass,
                    }}
                    className="btn"
                    style={{
                      background:
                        "#ffd9b3",
                    }}
                  >
                    Checkout
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
