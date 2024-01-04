import axios from "axios";
import React, { useState } from "react";
import {
  Link,
  useHistory,
} from "react-router-dom";
import { useEffect } from "react";
import swal from "sweetalert";

const EditGenre = (props) => {
  const history = useHistory();
  const [genreInput, setGenre] =
    useState([]);
  const [error, setError] = useState(
    []
  );
  const [loading, setLoading] =
    useState(true);
  useEffect(() => {
    const genre_id =
      props.match.params.id;
    axios
      .get(
        `/api/edit-genre/${genre_id}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          setGenre(res.data.genre);
        } else if (
          res.data.status === 404
        ) {
          swal(
            "Error",
            res.data.message,
            "error"
          );
          history.push(
            "/admin/view-genre"
          );
        }
        setLoading(false);
      });
  }, [props.match.params.id, history]);
  const handleInput = (e) => {
    e.persist();
    setGenre({
      ...genreInput,
      [e.target.name]: e.target.value,
    });
  };
  const updateGenre = (e) => {
    e.preventDefault();
    const genre_id =
      props.match.params.id;
    const data = genreInput;
    axios
      .post(
        `/api/update-genre/${genre_id}`,
        data
      )
      .then((res) => {
        if (res.data.status === 200) {
          swal(
            "Success",
            res.data.message,
            "success"
          );
          setError([]);
        } else if (
          res.data.status === 422
        ) {
          swal(
            "All fields are mandetory",
            "",
            "error"
          );
          setError(res.data.errors);
        } else if (
          res.data.status === 404
        ) {
          swal(
            "Error",
            res.data.message,
            "error"
          );
          history.push(
            "admin/view-genre"
          );
        }
      });
  };
  if (loading) {
    return <h4>Loading Genre...</h4>;
  }
  return (
    <div className="container px-a">
      <div className="container-fluid px-4">
        <h1 className="mt-4">
          Edit Genre
          <Link
            to="/admin/view-genre"
            className="btn btn primary btn-am float-end"
          >
            BACK
          </Link>
        </h1>
        <div>
          <form onSubmit={updateGenre}>
            <div className="mb-3">
              <label
                for="exampleInputEmail1"
                className="form-label"
              >
                Slug
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="slug"
                onChange={handleInput}
                value={genreInput.slug}
              />
            </div>
            <div className="mb-3">
              <label
                for="exampleInputPassword1"
                className="form-label"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleInput}
                value={genreInput.name}
              />
            </div>
            <div className="mb-3">
              <label
                for="exampleInputPassword1"
                className="form-label"
              >
                Zip code
              </label>
              <input
                type="text"
                name="zip_code"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleInput}
                value={
                  genreInput.zip_code
                }
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label
                className="form-check-label"
                for="exampleCheck1"
              >
                Status
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditGenre;
