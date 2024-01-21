import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Thankyou = () => {
  useEffect(() => {
    axios.get(`/api/mail`);
  }, []);

  return (
    <div>
      <h3
        style={{
          margin: 20,
        }}
      >
        Thank you for choosing out
        bookstore.♥
      </h3>
      <div className="col-md-4">
        <div className="card card-body mt-3">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
              textAlign: "center",
              backgroundColor:
                "#ffd9b3",
            }}
          >
            <h6>Back to homepage</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Thankyou;
