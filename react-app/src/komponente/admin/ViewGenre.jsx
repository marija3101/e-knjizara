import React, {
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ViewGenre = () => {
  const deleteGenre = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";
    axios
      .delete(`/api/delete-genre/${id}`)
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
  const [genreList, setGenreList] =
    useState([]);

  useEffect(() => {
    axios
      .get(`/api/view-genre`)
      .then((res) => {
        if (res.status === 200) {
          setGenreList(res.data.genre);
        }
        setloading(false);
      });
  }, []);

  var viewgenre_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading genre...</h4>;
  } else {
    viewgenre_HTMLTABLE = genreList.map(
      (item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.slug}</td>
            <td>{item.status}</td>
            <td>
              <Link
                to={`edit-genre/${item.id}`}
                className="btn btn-success btn-sm"
              >
                Edit
              </Link>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={(e) =>
                  deleteGenre(
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
      }
    );
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Genre List
            <Link
              to="/admin/genre"
              className="btn btn-primary btn-sm float-end"
            >
              Add Genre
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {viewgenre_HTMLTABLE}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewGenre;
