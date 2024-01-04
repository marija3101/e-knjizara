import React from "react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const Genre = () => {
  const [genreInput, setGenre] =
    useState({
      slug: "",
      name: "",
      status: "",
      error_list: [],
    });
  const handleInput = (e) => {
    e.persist();
    setGenre({
      ...genreInput,
      [e.target.name]: e.target.value,
    });
  };
  const submitGenre = (e) => {
    e.preventDefault();
    const data = {
      slug: genreInput.slug,
      name: genreInput.name,
      status: genreInput.status,
    };
    axios
      .post("/api/store-genre", data)
      .then((res) => {
        if (res.data.status === 200) {
          swal(
            "Success",
            res.data.message,
            "success"
          );
          document
            .getElementById(
              "GENRE_FORM"
            )
            .reset();
        } else if (
          res.data.status === 400
        ) {
          setGenre({
            ...genreInput,
            error_list: res.data.errors,
          });
        }
      });
  };

  var display_errors = [];
  if (genreInput.error_list) {
    display_errors = [
      genreInput.error_list.slug,
      genreInput.error_list.name,
    ];
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">
        Add Genre
        <Link
          to="/admin/view-genre"
          className="btn btn primary btn-am float-end"
        >
          View Genre
        </Link>
      </h1>
      {display_errors.map((item) => {
        return <p key={item}>{item}</p>;
      })}
      <div>
        <form
          onSubmit={submitGenre}
          id="GENRE_FORM"
        >
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
            <span>
              {
                genreInput.error_list
                  .slug
              }
            </span>
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
            <span>
              {
                genreInput.error_list
                  .name
              }
            </span>
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Genre;
