import React from "react";
import {
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const Checkout = (props) => {
  const history = useHistory();
  const { state } = props.location;
  const { res } = state;

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

  const [loading, setLoading] =
    useState(true);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(
    []
  );
  var totalCartPrice = 0;

  const [orderlist, setOrderList] =
    useState([]);

  useEffect(() => {
    axios
      .get("/api/all-orders")
      .then((res) => {
        if (res.data.status === 200) {
          setOrderList(res.data.order);
        }
      });
  }, []);

  const [
    checkoutInput,
    setCheckoutInput,
  ] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    status: "",
  });

  const [couponInput, setCouponInput] =
    useState({
      value: "",
    });

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

  const handleInput = (e) => {
    e.persist();
    setCheckoutInput({
      ...checkoutInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleInput2 = (e) => {
    e.persist();
    setCouponInput({
      ...couponInput,
      [e.target.name]: e.target.value,
    });
  };

  const submitOrder = (e) => {
    e.preventDefault();
    const data = {
      firstname:
        checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipcode: checkoutInput.zipcode,
      status: checkoutInput.status,
      //  res: couponInput.value,
      res: res,
    };
    axios
      .post(`/api/place-order`, data)
      .then((res) => {
        if (res.data.status === 200) {
          setOrderList(res.data.order);

          swal(
            "Order Placed Successfully",
            res.data.message,
            "success"
          );

          const data2 = {
            value: couponInput.value,
          };

          axios
            .post(
              "/api/store-coupon",
              data2
            )
            .then((res) => {
              if (
                res.data.status === 200
              ) {
                swal(
                  "Success",
                  res.data.message,
                  "success"
                );
              } else if (
                res.data.status === 400
              ) {
              }
            });

          setError([]);
          history.push("/thank-you");
        } else if (
          res.data.status === 422
        ) {
          swal(
            "All fields are mandetory",
            "",
            "error"
          );
          setError(res.data.errors);
        }
      });
  };

  if (loading) {
    return <h4>Loading Checkout...</h4>;
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
          <h6>Home / Checkout</h6>
        </div>
      </div>

      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <h4>
                    Ordering information
                  </h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          onChange={
                            handleInput
                          }
                          value={
                            checkoutInput.firstname
                          }
                          className="form-control"
                        />
                        <small className="text-danger">
                          {
                            error.firstname
                          }
                        </small>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          onChange={
                            handleInput
                          }
                          value={
                            checkoutInput.lastname
                          }
                          className="form-control"
                        />
                        <small className="text-danger">
                          {
                            error.lastname
                          }
                        </small>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>
                          Phone number
                        </label>
                        <input
                          type="text"
                          name="phone"
                          onChange={
                            handleInput
                          }
                          value={
                            checkoutInput.phone
                          }
                          className="form-control"
                        />
                        <small className="text-danger">
                          {error.phone}
                        </small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email"
                          onChange={
                            handleInput
                          }
                          value={
                            checkoutInput.email
                          }
                          className="form-control"
                        />
                        <small className="text-danger">
                          {error.email}
                        </small>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label>
                          Address
                        </label>
                        <textarea
                          rows="3"
                          name="address"
                          onChange={
                            handleInput
                          }
                          value={
                            checkoutInput.address
                          }
                          className="form-control"
                        ></textarea>
                        <small className="text-danger">
                          {
                            error.address
                          }
                        </small>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label>
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          onChange={
                            handleInput
                          }
                          value={
                            checkoutInput.city
                          }
                          className="form-control"
                        />
                        <small className="text-danger">
                          {error.city}
                        </small>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label>
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          onChange={
                            handleInput
                          }
                          value={
                            checkoutInput.state
                          }
                          className="form-control"
                        />
                        <small className="text-danger">
                          {error.state}
                        </small>
                      </div>
                    </div>

                    <div
                      className="form-group mb-3"
                      style={{
                        opacity: 0,
                        width: "0",
                        height: "0",
                      }}
                    >
                      <label>
                        Status
                      </label>
                      <input
                        type="text"
                        name="status"
                        onChange={
                          handleInput
                        }
                        value={
                          (checkoutInput.status = 1)
                        }
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label>
                          Zip code
                        </label>
                        <input
                          type="text"
                          name="zipcode"
                          onChange={
                            handleInput
                          }
                          value={
                            checkoutInput.zipcode
                          }
                          className="form-control"
                        />
                        <small className="text-danger">
                          {
                            error.zipcode
                          }
                        </small>
                      </div>
                    </div>

                    <div
                      className="col-md-4"
                      style={{
                        opacity: 0,
                        width: "0px",
                        height: "0px",
                      }}
                    >
                      <div className="form-group mb-3">
                        <label>
                          Value
                        </label>
                        <input
                          type="text"
                          name="value"
                          onChange={
                            handleInput2
                          }
                          value={
                            (couponInput.value = 10)
                          }
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group text-end">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={
                            submitOrder
                          }
                        >
                          Place order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th width="50%">
                      Book
                    </th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(
                    (item, idx) => {
                      totalCartPrice +=
                        item.book
                          .price *
                        item.book_qty;
                      return (
                        <tr key={idx}>
                          <th>
                            {
                              item.book
                                .title
                            }
                          </th>
                          <th>
                            {
                              item.book
                                .price
                            }
                          </th>
                          <th>
                            {
                              item.book_qty
                            }
                          </th>
                          <th>
                            {item.book
                              .price *
                              item.book_qty}
                          </th>
                        </tr>
                      );
                    }
                  )}
                  <tr>
                    <td
                      colSpan="4"
                      className="text-end fw-bold"
                    >
                      Total price:{" "}
                      {totalCartPrice}
                    </td>
                  </tr>
                  {res == 0 ? (
                    <></>
                  ) : (
                    <>
                      <tr>
                        {" "}
                        <td
                          colSpan="4"
                          className="text-end fw-bold"
                        >
                          With discount:{" "}
                          {res}
                        </td>
                      </tr>{" "}
                    </>
                  )}{" "}
                  <hr />
                  <p>
                    Payment Method: Cash
                    On Delivery
                  </p>
                  <hr />
                  <p>
                    Shipping Method:
                    Free Shipping
                  </p>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
