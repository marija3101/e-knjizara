import React, {
    useState,
    useEffect,
  } from "react";
  import { Link } from "react-router-dom";
  import axios from "axios";
  import swal from "sweetalert";
  
  
  const ViewCity = () => {
  
    const deleteCity=(e,id)=>{
      e.preventDefault();
      const thisClicked=e.currentTarget;
      thisClicked.innerText="Deleting";
      axios.delete(`/api/delete-city/${id}`).then(res=>{
      if(res.data.status===200)
      {
      swal("Success",res.data.message,"success");
      thisClicked.closest("tr").remove();
      }
      else if(res.data.status===404)
      {
      swal("Success",res.data.message,"success");
      thisClicked.innerText="Delete";
      }
      });
      }
  
  
  
    const [loading, setloading] =
      useState(true);
    const [cityList, setCityList] =
      useState([]);
  
    useEffect(() => {
      axios
        .get(`/api/view-city`)
        .then((res) => {
          if (res.status === 200) {
            setCityList(
              res.data.city
            );
          }
          setloading(false);
        });
    }, []);
  
    var viewcity_HTMLTABLE = "";
    if (loading) {
      return <h4>Loading city...</h4>;
    } else {
      viewcity_HTMLTABLE =
        cityList.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td>{item.status}</td>
              <td>
                <Link
                  to={`edit-city/${item.id}`}
                  className="btn btn-success btn-sm"
                >
                  Edit
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={(e)=>deleteCity(e,item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        });
    }
  
    return (
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header">
            <h4>
              City List
              <Link
                to="/admin/city"
                className="btn btn-primary btn-sm float-end"
              >
                Add City
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
                {viewcity_HTMLTABLE}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default ViewCity;
  
