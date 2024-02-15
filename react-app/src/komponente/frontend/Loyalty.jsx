import React from "react";
import "./Loyalty.css";
import Popup from "./Popup";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
const Loyalty = () => {
  const [buttonPopup, setButtonPopup] =
    useState(false);
  const [order, setOrder] = useState(
    []
  );
  const history = useHistory();
  var Total = [];

  const [coupon, setCoupon] = useState(
    []
  );

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`/api/view-coupon`)
      .then((res) => {
        if (isMounted) {
          if (res.data.status === 200) {
            setCoupon(res.data.coupon);
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

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`/api/view-order`)
      .then((res) => {
        if (isMounted) {
          if (res.data.status === 200) {
            setOrder(res.data.order);
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

  return (
    <div className="glavna">
      <h1 className="h1naslov">
        Loyalty Program
      </h1>
      <div className="sekcija">
        <h2>Our Loyalty Program</h2>
        <p>
          Welcome to our loyalty
          program! Earn coupons with
          every purchase and enjoy
          exclusive benefits.
        </p>

        <h3>How it Works</h3>
        <p>
          Make a purchase, collect
          coupons, and redeem code.. The
          more you shop, the more you
          save!
        </p>

        <div className="loyalty-card">
          <h3>Your Loyalty rules</h3>
          <p>
            You don't need a card. Every
            order on the site carries
            10% discount and you can use
            the given coupon for that.
          </p>
        </div>

        <hr />

        <table id="customers">
          <tr>
            <td>One order</td>
            <td>One coupon</td>
          </tr>
          <tr>
            <th>One order</th>
            <th>
              10% discount for next
              order
            </th>
          </tr>
        </table>
        <p>
          You can use the discount on
          any of the following orders,
          but only one coupon for one
          order.
        </p>
        <hr />
        <p>
          You can check your coupons at
          this{" "}
          <button
            onClick={() =>
              setButtonPopup(true)
            }
          >
            link.
          </button>
          <Popup
            trigger={buttonPopup}
            setTrigger={setButtonPopup}
          >
            <p>
              Your current coupons are:
            </p>
            {order.map((item) => {
              coupon.map((item1) => {
                item.user_id ==
                item1.user_id ? (
                  Total.push(
                    item1.code + " "
                  )
                ) : (
                  <></>
                );
              });

              for (
                let index = 0;
                index <
                Total.length - 1;
                index++
              ) {
                for (
                  let index2 = 1;
                  index2 < Total.length;
                  index2++
                ) {
                  const element =
                    Total[index];
                  const element2 =
                    Total[index2];
                  if (
                    element == element2
                  ) {
                    Total.pop(element);
                  }
                }
              }
            })}

            <p>{Total}</p>
            <p>
              You can use only one
              coupon in the cart.
            </p>
          </Popup>
        </p>
      </div>
      <hr />
    </div>
  );
};

export default Loyalty;
