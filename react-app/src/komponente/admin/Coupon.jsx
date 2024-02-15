import React from "react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Coupon = () => {
  const [couponInput, setCoupon] =
    useState({
      //  code: "",
      value: "",
      error_list: [],
    });

  const [orderlist, setOrderList] =
    useState([]);
  useEffect(() => {
    axios
      .get("/api/all-orders")
      .then((res) => {
        if (res.data.status === 200) {
          setOrderList(res.data.order);
          console.log(orderlist);
        }
      });
  }, []);
  const handleInput = (e) => {
    e.persist();
    setCoupon({
      ...couponInput,
      [e.target.name]: e.target.value,
    });
  };
  const submitCoupon = (e) => {
    e.preventDefault();
    const data = {
      //  code: couponInput.code,
      value: couponInput.value,
    };
    axios
      .post("/api/store-coupon", data)
      .then((res) => {
        if (res.data.status === 200) {
          swal(
            "Success",
            res.data.message,
            "success"
          );
          document
            .getElementById(
              "COUPON_FORM"
            )
            .reset();
        } else if (
          res.data.status === 400
        ) {
          setCoupon({
            ...couponInput,
            error_list: res.data.errors,
          });
        }
      });
  };

  var display_errors = [];
  if (couponInput.error_list) {
    display_errors = [
      //  couponInput.error_list.code,
      couponInput.error_list.value,
    ];
  }

  return (
    <div className="container-fluid px-4">
      {display_errors.map((item) => {
        return (
          <p
            className="mb-1"
            key={item}
          >
            {item}
          </p>
        );
      })}
      <div className="card mt-4">
        <div className="card-header">
          <h1>
            Add Coupon
            <Link
              to="/admin/view-coupon"
              className="btn btn primary btn-am float-end"
            >
              View Coupon
            </Link>
          </h1>
        </div>

        <form
          onSubmit={submitCoupon}
          id="COUPON_FORM"
        >
          <div
            className="tab-content"
            id="myTabContent"
          >
            <div
              className="tab-pane card-body border fade show active "
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div>
                <div className="mb-3">
                  <label
                    for="exampleInputPassword1"
                    className="form-label"
                  >
                    Value
                  </label>
                  <input
                    type="text"
                    name="value"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={
                      handleInput
                    }
                    value={
                      couponInput.value
                    }
                  />
                  <span>
                    {
                      couponInput
                        .error_list
                        .value
                    }
                  </span>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Coupon;
