import React, {
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";


const ViewAuthor = () => {

  const deleteAuthor=(e,id)=>{
    e.preventDefault();
    const thisClicked=e.currentTarget;
    thisClicked.innerText="Deleting";
    axios.delete(`/api/delete-author/${id}`).then(res=>{
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
  const [authorList, setAuthorList] =
    useState([]);

  useEffect(() => {
    axios
      .get(`/api/view-author`)
      .then((res) => {
        if (res.status === 200) {
          setAuthorList(
            res.data.author
          );
        }
        setloading(false);
      });
  }, []);

  var viewauthor_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading author...</h4>;
  } else {
    viewauthor_HTMLTABLE =
      authorList.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.slug}</td>
            <td>{item.status}</td>
            <td>
              <Link
                to={`edit-author/${item.id}`}
                className="btn btn-success btn-sm"
              >
                Edit
              </Link>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={(e)=>deleteAuthor(e,item.id)}
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
            Author List
            <Link
              to="/admin/author"
              className="btn btn-primary btn-sm float-end"
            >
              Add Author
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
              {viewauthor_HTMLTABLE}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAuthor;
