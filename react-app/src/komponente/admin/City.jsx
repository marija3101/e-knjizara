import React from "react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const City = () => {
  const [cityInput, setCity] =
    useState({
      slug: "",
      name: "",
      zip_code: "",
      status: "",
      error_list: [],
    });
  const handleInput = (e) => {
    e.persist();
    setCity({
      ...cityInput,
      [e.target.name]: e.target.value,
    });
  };
  const submitCity = (e) => {
    e.preventDefault();
    const data = {
      slug: cityInput.slug,
      name: cityInput.name,
     zip_code:
        cityInput.zip_code,
     status: cityInput.status,
    };
    axios
      .post("/api/store-city", data)
      .then((res) => {
        if (res.data.status === 200) {
          swal(
            "Success",
            res.data.message,
            "success"
          );
          document
            .getElementById(
              "CITY_FORM"
            )
            .reset();
        } else if (
          res.data.status === 400
        ) {
          setCity({
            ...cityInput,
            error_list: res.data.errors,
          });
        }
      });
  };

  var display_errors = [];
  if (cityInput.error_list) {
    display_errors = [
      cityInput.error_list.slug,
      cityInput.error_list.name,
      cityInput.error_list.zip_code,

    ];
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">
        Add City
        <Link to='/admin/view-city' className="btn btn primary btn-am float-end">View City</Link>
      </h1>
      {display_errors.map((item) => {
        return <p key={item}>{item}</p>;
      })}
      <div>
        <form
          onSubmit={submitCity}
          id="CITY_FORM"
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
              value={cityInput.slug}
            />
            <span>
              {
                cityInput.error_list
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
              value={cityInput.name}
            />
            <span>
              {
                cityInput.error_list
                  .name
              }
            </span>
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
                cityInput.zip_code
              }
            />
            <span>
              {
                cityInput.error_list
                  .zip_code
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

export default City;

