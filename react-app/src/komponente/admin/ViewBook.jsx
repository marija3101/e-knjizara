import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const ViewBook = () => {
  const [sort, setSort] =
  useState(true);
  const [input, setInput] =
  useState("");
const [output, setOutput] = useState(
  []
);
useEffect(() => {
  setOutput([]);
  viewBook.filter((val) => {
    if (
      val.title
        .toLowerCase()
        .includes(input.toLowerCase())
    ) {
      setOutput((output) => [
        ...output,
        val,
      ]);
    }
  });
}, [input]);


  const deleteBook=(e,id)=>{
    e.preventDefault();
    const thisClicked=e.currentTarget;
    thisClicked.innerText="Deleting";
    axios.delete(`/api/delete-book/${id}`).then(res=>{
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
    const [viewBook, setBook] =
    useState([]);
    useEffect(() => {
      document.title = "View Book";
        axios
          .get('/api/view-book')
          .then(res => {
            if (res.data.status === 200) {
                setBook(res.data.books);
     
              }
              setloading(false);
              
          });
      }, []);
      var viewbooks_HTMLTABLE = "";
      if (loading) {
        return <h4>Loading books...</h4>
      } else {
        viewbooks_HTMLTABLE =
          output.sort((a, b) =>     //SORTIRANJE I PRETRAGA
          a.title < b.title
            ? -1
            : 1
        ).map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.author.name}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td><img src={`http://127.0.0.1:8000/${item.image}`} width="50px" alt={item.name}/></td>
                <td>
                <Link to={`edit-book/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={(e)=>deleteBook(e,item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          });
      }
    return (

        <div className="card mt-4">
          <div className="card-header">
            <h4>
              View Book
              <Link
                to="/admin/add-book"
                className="btn btn-primary btn-sm float-end"
              >
                Add Book
              </Link>
            </h4>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Author name</th>
                  <th>Title</th>
                  <th>Decription</th>
                  <th>Image</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
             {viewbooks_HTMLTABLE}
              </tbody>
            </table>
            <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Find title of book"
              aria-label="Search"
              onChange={(e) =>
                setInput(e.target.value)
              }
            />
          </form>
          </div>
        </div>
    )
}

export default ViewBook
