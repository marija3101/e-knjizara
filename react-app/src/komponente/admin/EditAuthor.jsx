import axios from "axios";
import React, { useState } from "react";
import {
  Link,
  useHistory,
} from "react-router-dom";
import { useEffect } from "react";
import swal from "sweetalert";

const EditAuthor = (props) => {
  const history = useHistory();
  const [authorInput, setAuthor] =
    useState([]);
  const [error, setError] = useState(
    []
  );
  const [loading, setLoading] =
    useState(true);
  useEffect(() => {
    const author_id =
      props.match.params.id;
    axios
      .get(
        `/api/edit-author/${author_id}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          setAuthor(res.data.author);
        } else if (
          res.data.status === 404
        ) {
          swal(
            "Error",
            res.data.message,
            "error"
          );
          history.push(
            "/admin/view-author"
          );
        }
        setLoading(false);
      });
  }, [props.match.params.id, history]);
  const handleInput = (e) => {
    e.persist();
    setAuthor({
      ...authorInput,
      [e.target.name]: e.target.value,
    });
  };
  const updateAuthor = (e) => {
    e.preventDefault();
    const author_id =
      props.match.params.id;
    const data = authorInput;
    axios
      .put(
        `/api/update-author/${author_id}`,
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
            "admin/view-author"
          );
        }
      });
  };
  if (loading) {
    return <h4>Loading Author...</h4>;
  }
  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h1>
            Edit Author
            <Link
              to="/admin/view-author"
              className="btn btn primary btn-am float-end"
            >
              BACK
            </Link>
          </h1>
        </div>

        <form onSubmit={updateAuthor}>
          <ul
            className="nav nav-tabs"
            id="myTab"
            role="tablist"
          >
            <li
              className="nav-item"
              role="presentation"
            >
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Home
              </button>
            </li>
            <li
              className="nav-item"
              role="presentation"
            >
              <button
                className="nav-link"
                id="seo-tags-tab"
                data-bs-toggle="tab"
                data-bs-target="#seo-tags"
                type="button"
                role="tab"
                aria-controls="seo-tags"
                aria-selected="false"
              >
                SEO tags
              </button>
            </li>
          </ul>
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
                    onChange={
                      handleInput
                    }
                    value={
                      authorInput.slug
                    }
                  />
                  <small className="text-danger">
                    {error.slug}
                  </small>
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
                    onChange={
                      handleInput
                    }
                    value={
                      authorInput.name
                    }
                  />
                  <small className="text-danger">
                    {error.name}
                  </small>
                </div>
                <div className="mb-3 form-check">
                  <label
                    className="form-check-label"
                    for="exampleCheck1"
                  >
                    Status
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    value="1"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Update
                </button>
              </div>
            </div>
            <div
              className="tab-pane card-body border fade"
              id="seo-tags"
              role="tabpanel"
              aria-labelledby="seo-tags-tab"
            >
              <div className="form-group mb-3">
                <label>
                  Meta title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="metatitle"
                  onChange={handleInput}
                  value={
                    authorInput.metatitle
                  }
                />
                <small className="text-danger">
                  {error.metatitle}
                </small>
              </div>
              <div className="form-group mb-3">
                <label>
                  Meta keywords
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="metakeywords"
                  onChange={handleInput}
                  value={
                    authorInput.metakeywords
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditAuthor;
