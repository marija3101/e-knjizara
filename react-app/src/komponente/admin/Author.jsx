import React from "react";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const Author = () => {
  const [authorInput, setAuthor] =
    useState({
      slug: "",
      name: "",
      resting_place: "",
      status: "",
      metatitle: "",
      metakeywords: "",
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
      metatitle: authorInput.metatitle,
      metakeywords: authorInput.metakeywords,
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
      authorInput.error_list.metatitle,
    ];
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">
        Add Author
        <Link to='/admin/view-author' className="btn btn primary btn-am float-end">View Author</Link>
      </h1>
      {display_errors.map((item) => {
        return <p className='mb-1' key={item}>{item}</p>;
      })}
<form
          onSubmit={submitAuthor}
          id="AUTHOR_FORM"
        >
<ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO tags</button>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane card-body border fade show active " id="home" role="tabpanel" aria-labelledby="home-tab">
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
        
      </div>
  </div>
  <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
  <div className="form-group mb-3">
            <label
            >
              Meta title
            </label>
            <input
              type="text"
              className="form-control"
              name="metatitle"
              onChange={handleInput}
              value={authorInput.metatitle}
            />
             <span>
              {
                authorInput.error_list
                  .metatitle
              }
            </span>
          </div>
          <div className="form-group mb-3">
            <label
            >
              Meta keywords
            </label>
            <input
              type="text"
              className="form-control"
              name="metakeywords"
              onChange={handleInput}
              value={authorInput.metakeywords}
            />
          </div>
  </div>
</div>
</form>
    </div>
  );
};

export default Author;
