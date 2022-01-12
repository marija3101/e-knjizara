import { useState } from "react";
import axios from "axios";
import {
  generatePath,
  useHistory,
  useNavigate,
} from "react-router-dom";
import NavBar from "../../NavBar";
import swal from "sweetalert";

const Register = () => {
  const history = useHistory();
  const [registerInput, setRegister] =
    useState({
      name: "",
      email: "",
      password: "",
      error_list: [],
    });

  //let navigate = generatePath();

  const handleInput = (e) => {
    //console.log(e);
    e.persist();
    setRegister({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
    /*let newUserData = userData;
    newUserData[e.target.name] =
      e.target.value;
    setUserData(newUserData);*/
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };
    axios
      .get("/sanctum/csrf-cookie")
      .then((response) => {
        axios
          .post("api/register", data)
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
              history.push("/");
            } else {
              setRegister({
                ...registerInput,
                error_list:
                  res.data
                    .validation_errors,
              });
            }
            /*console.log(res.data);
        path("/login");*/
          });
        //.catch((e) => console.log(e));
      });
  };

  return (
    <section
      className="h-100 gradient-form"
      style={{
        backgroundColor: +"#eee",
      }}
    >
      <NavBar />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        style={{
                          width:
                            185 + "px",
                        }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">
                        We are The Lotus
                        Team
                      </h4>
                    </div>

                    <form
                      onSubmit={
                        handleRegister
                      }
                    >
                      <p>
                        Please login to
                        your account
                      </p>
                      <div className="form-outline mb-4">
                        <input
                          type=""
                          id="form2Example11"
                          className="form-control"
                          placeholder="Name"
                          onChange={
                            handleInput
                          }
                          name="name"
                          value={
                            registerInput.name
                          }
                        />
                        <span>
                          {
                            registerInput
                              .error_list
                              .name
                          }
                        </span>
                        <label
                          className="form-label"
                          for="form2Example11"
                        >
                          Username
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type=""
                          id="form2Example33"
                          className="form-control"
                          placeholder="Email address"
                          onChange={
                            handleInput
                          }
                          name="email"
                          value={
                            registerInput.email
                          }
                        />
                        <span>
                          {
                            registerInput
                              .error_list
                              .email
                          }
                        </span>
                        <label
                          className="form-label"
                          for="form2Example11"
                        >
                          Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type=""
                          id="form2Example22"
                          className="form-control"
                          placeholder="Password"
                          onChange={
                            handleInput
                          }
                          value={
                            registerInput.password
                          }
                          name="password"
                        />
                        <span>
                          {
                            registerInput
                              .error_list
                              .password
                          }
                        </span>
                        <label
                          className="form-label"
                          for="form2Example22"
                        >
                          Password
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">
                      We are more than
                      just a company
                    </h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor
                      sit amet,
                      consectetur
                      adipisicing elit,
                      sed do eiusmod
                      tempor incididunt
                      ut labore et
                      dolore magna
                      aliqua. Ut enim ad
                      minim veniam, quis
                      nostrud
                      exercitation
                      ullamco laboris
                      nisi ut aliquip ex
                      ea commodo
                      consequat.
                    </p>
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

export default Register;
