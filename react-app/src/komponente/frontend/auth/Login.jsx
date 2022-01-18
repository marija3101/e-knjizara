import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../NavBar";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const Login = ({ }) => {
  const history = useHistory();
  const [loginInput, setLogin] =
    useState({
      email: "",
      password: "",
      error_list: [],
    });

  

  const handleInput = (e) => {
    
    e.persist();
    setLogin({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
    
  };
  
  
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios
      .get("/sanctum/csrf-cookie")
      .then((response) => {
        axios
          .post("api/login", data)
          .then((res) => {
            if (
              res.data.status === 200
            ) {
              localStorage.setItem(
                "auth_token",
                res.data.token
              );
              localStorage.setItem(
                "auth_name",
                res.data.name
              );
              swal(
                "Success",
                res.data.message,
                "success"
              );
              if (
                res.data.role ===
                "admin"
              ) {
                history.push(
                  "/admin/dashboard"
                );
              } else {
                history.push("/");
              }
            } else if (
              res.data.status === 401
            ) {
              swal(
                "Warning",
                res.data.message,
                "warning"
              );
            } else {
              setLogin({
                ...loginInput,
                error_list:
                  res.data
                    .validation_errors,
              });
            }
          
          });
        
      });
  };

  return (
    <section
      className="h-100 gradient-form"
      style={{
        backgroundColor: +"#eee",
      }}
    >

      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/003/284/218/original/open-pink-envelope-with-a-love-note-with-heart-valentines-day-vector.jpg"
                        style={{
                          width:
                            185 + "px",
                            borderRadius: '100%'
                        }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">
                        Log in to Bookland
                      </h4>
                    </div>

                    <form
                      onSubmit={
                        handleLogin
                      }
                    >


                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Email address"
                          onChange={
                            handleInput
                          }
                          value={
                            loginInput.email
                          }
                          name="email"
                        />
                        <span>
                          {
                            loginInput
                              .error_list
                              .email
                          }
                        </span>

                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="Password"
                          onChange={
                            handleInput
                          }
                          value={
                            loginInput.password
                          }
                          name="password"
                        />
                        <span>
                          {
                            loginInput
                              .error_list
                              .password
                          }
                        </span>

                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          type="submit"
                          className="btn"
                        >
                          Log in
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">
                          Don't have an
                          account?
                        </p>
                        <a
                          href="/register"
                          className="btn btn-outline-danger"
                        >
                          Create new
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center">
                  <img src="https://images.unsplash.com/photo-1592211951067-6c3ce19cca90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80" alt="" style={{width:'650px', height: '720px'}}/>
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
