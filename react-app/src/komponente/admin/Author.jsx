import React from "react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const Author = () => {
  const [authorInput, setAuthor] =
    useState({
      slug: "",
      name: "",
      resting_place: "",
      status: "",
      error_list: [],
    });
  const handleInput = (e) => {
    e.persist();
    setAuthor({
      ...authorInput,
      [e.target.name]: e.target.value,
    });
  };
  const submitAuthor = (e) => {
    e.preventDefault();
    const data = {
      slug: authorInput.slug,
      name: authorInput.name,
      resting_place:
        authorInput.resting_place,
      status: authorInput.status,
    };
    axios
      .post("/api/store-author", data)
      .then((res) => {
        if (res.data.status === 200) {
          swal(
            "Success",
            res.data.message,
            "success"
          );
          document
            .getElementById(
              "AUTHOR_FORM"
            )
            .reset();
        } else if (
          res.data.status === 400
        ) {
          setAuthor({
            ...authorInput,
            error_list: res.data.errors,
          });
        }
      });
  };

  var display_errors = [];
  if (authorInput.error_list) {
    display_errors = [
      authorInput.error_list.slug,
      authorInput.error_list.name,
      authorInput.error_list
        .resting_place,
    ];
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">
        Add Author
      </h1>
      {display_errors.map((item) => {
        return <p key={item}>{item}</p>;
      })}
      <div>
        <form
          onSubmit={submitAuthor}
          id="AUTHOR_FORM"
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
              value={authorInput.slug}
            />
            <span>
              {
                authorInput.error_list
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
              value={authorInput.name}
            />
            <span>
              {
                authorInput.error_list
                  .name
              }
            </span>
          </div>
          <div className="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label"
            >
              Resting place
            </label>
            <input
              type="text"
              name="resting_place"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleInput}
              value={
                authorInput.resting_place
              }
            />
            <span>
              {
                authorInput.error_list
                  .resting_place
              }
            </span>
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Author;
