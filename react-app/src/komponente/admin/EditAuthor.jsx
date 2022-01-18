import axios from 'axios';
import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useEffect } from 'react';
import swal from 'sweetalert';

const EditAuthor = (props) => 
{
const history=useHistory();
const[authorInput,setAuthor]=useState([]); 
const[error,setError]=useState([]);
const[loading,setLoading]=useState(true);
useEffect(()=>{
const author_id=props.match.params.id;
axios.get(`/api/edit-author/${author_id}`).then(res=>{
if(res.data.status===200)
{
setAuthor(res.data.author);
}
else if(res.data.status===404){
swal("Error",res.data.message,"error");
history.push('/admin/view-author');
}
setLoading(false);
});

},[props.match.params.id, history]);
const handleInput=(e)=>{ 
e.persist();
setAuthor({...authorInput,[e.target.name]:e.target.value});
}
const updateAuthor=(e)=>{
e.preventDefault();
const author_id=props.match.params.id;
const data=authorInput;
axios.put(`/api/update-author/${author_id}`,data).then(res=>{
if(res.data.status===200)
{
swal("Success",res.data.message,"success");
setError([]);
}
else if(res.data.status===422){
swal("All fields are mandetory","","error");
setError(res.data.errors);
}
else if(res.data.status===404)
{
swal("Error",res.data.message,"error");
history.push('admin/view-author');
}
});
}
if(loading)
{
return <h4>Loading Author...</h4>
}
return(
    <div className='container px-a'>
<div className="container-fluid px-4">
      <h1 className="mt-4">
      Edit Author
        <Link to='/admin/view-author' className="btn btn primary btn-am float-end">BACK</Link>
      </h1>
      <div>
        <form onSubmit={updateAuthor}
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
            Update
          </button>
        </form>
      </div>
    </div>
    </div>
)
}
export default EditAuthor;