import React, { useState } from "react";
import {
  Link,
  useHistory,
} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const EditBook = (props) => {
  const history = useHistory();

  const [authorlist, setAuthorlist] =
    useState([]);
  const [genrelist, setGenrelist] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [bookInput, setBook] = useState(
    {
      author_id: "",
      genre_id: "",
      slug: "",
      quantity: "",
      price: "",
      title: "",
      description: "",
      metatitle: "",
      metakeywords: "",
    }
  );
  const [picture, setPicture] =
    useState([]);

  const [errorlist, setError] =
    useState([]);

  const handleInput = (e) => {
    e.persist();
    setBook({
      ...bookInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleImage = (e) => {
    setPicture({
      image: e.target.files[0],
    });
  };

  const [checkbox, setCheckboxes] =
    useState([]);
  const handleCheckbox = (e) => {
    e.persist();
    setCheckboxes({
      ...checkbox,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    axios
      .get("/api/all-authors")
      .then((res) => {
        if (res.data.status === 200) {
          setAuthorlist(
            res.data.author
          );
        }
      });

    axios
      .get("/api/all-genres")
      .then((res) => {
        if (res.data.status === 200) {
          setGenrelist(res.data.genre);
        }
      });

    const book_id =
      props.match.params.id;
    axios
      .get(`/api/edit-book/${book_id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setBook(res.data.book);
          setCheckboxes(res.data.book);
        } else if (
          res.data.status === 404
        ) {
          swal(
            "Error",
            res.data.message,
            "error"
          );
          history.push(
            "/admin/view-book"
          );
        }
        setLoading(false);
      });
  }, [props.match.params.id]);

  const updateBook = (e) => {
    e.preventDefault();
    const book_id =
      props.match.params.id;
    const formData = new FormData();
    formData.append(
      "image",
      picture.image
    );
    formData.append(
      "author_id",
      bookInput.author_id
    );
    formData.append(
      "genre_id",
      bookInput.genre_id
    );
    formData.append(
      "slug",
      bookInput.slug
    );
    formData.append(
      "quantity",
      bookInput.quantity
    );
    formData.append(
      "price",
      bookInput.price
    );
    formData.append(
      "title",
      bookInput.title
    );
    formData.append(
      "description",
      bookInput.description
    );
    formData.append(
      "status",
      checkbox.status ? "1" : "0"
    );
    formData.append(
      "metatitle",
      bookInput.metatitle
    );
    formData.append(
      "metakeywords",
      bookInput.metakeywords
    );

    axios
      .post(
        `/api/update-book/${book_id}`,
        formData
      )
      .then((res) => {
        if (res.data.status === 200) {
          swal(
            "success",
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
            "admin/view-book"
          );
        }
      });
  };

  if (loading) {
    return (
      <h4>Edit Book data loading...</h4>
    );
  }

  return (
    <div className="container-fluid px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Edit Book
            <Link
              to="/admin/view-book"
              className="btn btn-primary btn-sm float-end"
            >
              {" "}
              View Book
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form
            onSubmit={updateBook}
            encType="multipart/form-data"
          >
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
                  id="seotags-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#seotags"
                  type="button"
                  role="tab"
                  aria-controls="seotags"
                  aria-selected="false"
                >
                  Seo tags
                </button>
              </li>
            </ul>
            <div
              className="tab-content"
              id="myTabContent"
            >
              <div
                className="tab-pane card-body border fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="mb-3">
                  <label
                    for="exampleInputPassword1"
                    className="form-label"
                  >
                    Select author
                  </label>
                  <select
                    type="text"
                    name="author_id"
                    onChange={
                      handleInput
                    }
                    value={
                      bookInput.author_id
                    }
                    className="form-control"
                    id="exampleInputPassword1"
                  >
                    <option>
                      Izaberi autora
                    </option>
                    {authorlist.map(
                      (item) => {
                        return (
                          <option
                            value={
                              item.id
                            }
                            key={
                              item.id
                            }
                          >
                            {item.name}
                          </option>
                        );
                      }
                    )}
                  </select>
                  <small className="text-danger">
                    {
                      errorlist.author_id
                    }
                  </small>
                </div>
                <div className="mb-3">
                  <label
                    for="exampleInputPassword1"
                    className="form-label"
                  >
                    Select genre
                  </label>

                  <select
                    type="text"
                    name="genre_id"
                    onChange={
                      handleInput
                    }
                    value={
                      bookInput.genre_id
                    }
                    className="form-control"
                    id="exampleInputPassword1"
                  >
                    <option>
                      Izaberi grad
                    </option>
                    {genrelist.map(
                      (item) => {
                        return (
                          <option
                            value={
                              item.id
                            }
                            key={
                              item.id
                            }
                          >
                            {item.name}
                          </option>
                        );
                      }
                    )}
                  </select>
                  <small className="text-danger">
                    {errorlist.genre_id}
                  </small>
                </div>
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
                      bookInput.slug
                    }
                  />
                  <small className="text-danger">
                    {errorlist.slug}
                  </small>
                </div>
                <div className="mb-3">
                  <label>
                    Quantity
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="quantity"
                    onChange={
                      handleInput
                    }
                    value={
                      bookInput.quantity
                    }
                  />
                  <small className="text-danger">
                    {errorlist.quantity}
                  </small>
                </div>
                <div className="mb-3">
                  <label
                    for="exampleInputEmail1"
                    className="form-label"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="price"
                    onChange={
                      handleInput
                    }
                    value={
                      bookInput.price
                    }
                  />
                  <small className="text-danger">
                    {errorlist.price}
                  </small>
                </div>
                <div className="mb-3">
                  <label
                    for="exampleInputPassword1"
                    className="form-label"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={
                      handleInput
                    }
                    value={
                      bookInput.title
                    }
                  />
                  <small className="text-danger">
                    {errorlist.title}
                  </small>
                </div>
                <div className="mb-3">
                  <label
                    for="exampleInputPassword1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={
                      handleInput
                    }
                    value={
                      bookInput.description
                    }
                  />
                  <small className="text-danger">
                    {
                      errorlist.description
                    }
                  </small>
                </div>

                <div className="mb-3">
                  <label
                    for="exampleInputPassword1"
                    className="form-label"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={
                      handleImage
                    }
                  />
                  <img
                    src={`http://localhost:8000/${bookInput.image}`}
                    width="50px"
                  />
                  <small className="text-danger">
                    {errorlist.image}
                  </small>
                </div>
                <div className="col-md-4 form-group mb-3">
                  <label>Status</label>
                  <input
                    type="checkbox"
                    className="w-50 h-50"
                    name="status"
                    onChange={
                      handleCheckbox
                    }
                    defaultChecked={
                      checkbox.status ===
                      1
                        ? true
                        : false
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary px-4 mt-2"
                >
                  Submit
                </button>
              </div>
              <div
                class="tab-pane card-body border fade"
                id="seotags"
                role="tabpanel"
                aria-labelledby="seotags-tab"
              >
                <div className="form-group mb-3">
                  <label>
                    Meta title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="metatitle"
                    onChange={
                      handleInput
                    }
                    value={
                      bookInput.metatitle
                    }
                  />
                  <small className="text-danger">
                    {
                      errorlist.metatitle
                    }
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
                    onChange={
                      handleInput
                    }
                    value={
                      bookInput.metakeywords
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
