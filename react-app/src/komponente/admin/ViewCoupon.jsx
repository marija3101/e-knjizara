import React, {
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ViewCoupon = () => {
  const deleteCoupon = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";
    axios
      .delete(
        `/api/delete-coupon/${id}`
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
            "Success",
            res.data.message,
            "success"
          );
          thisClicked.innerText =
            "Delete";
        }
      });
  };

  const [loading, setloading] =
    useState(true);
  const [couponList, setCouponList] =
    useState([]);

  useEffect(() => {
    axios
      .get(`/api/view-coupon`)
      .then((res) => {
        if (res.status === 200) {
          setCouponList(
            res.data.coupon
          );
        }
        setloading(false);
      });
  }, []);

  var viewcoupon_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading coupon...</h4>;
  } else {
    viewcoupon_HTMLTABLE =
      couponList.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.code}</td>
            <td>{item.value}</td>
            <td>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={(e) =>
                  deleteCoupon(
                    e,
                    item.id
                  )
                }
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Coupon List
            <Link
              to="/admin/coupons"
              className="btn btn-primary btn-sm float-end"
            >
              Add Coupon
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Value</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {viewcoupon_HTMLTABLE}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCoupon;
