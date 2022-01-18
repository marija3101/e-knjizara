import axios from 'axios';
import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useEffect } from 'react';
import swal from 'sweetalert';

const EditCity = (props) => 
{
const history=useHistory();
const[cityInput,setCity]=useState([]); 
const[error,setError]=useState([]);
const[loading,setLoading]=useState(true);
useEffect(()=>{
const city_id=props.match.params.id;
axios.get(`/api/edit-city/${city_id}`).then(res=>{
if(res.data.status===200)
{
setCity(res.data.city);
}
else if(res.data.status===404){
swal("Error",res.data.message,"error");
history.push('/admin/view-city');
}
setLoading(false);
});

},[props.match.params.id, history]);
const handleInput=(e)=>{ 
e.persist();
setCity({...cityInput,[e.target.name]:e.target.value});
}
const updateCity=(e)=>{
e.preventDefault();
const city_id=props.match.params.id;
const data=cityInput;
axios.post(`/api/update-city/${city_id}`,data).then(res=>{
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
history.push('admin/view-city');
}
});
}
if(loading)
{
return <h4>Loading City...</h4>
}
return(
    <div className='container px-a'>
<div className="container-fluid px-4">
      <h1 className="mt-4">
      Edit City
        <Link to='/admin/view-city' className="btn btn primary btn-am float-end">BACK</Link>
      </h1>
      <div>
        <form onSubmit={updateCity}
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
export default EditCity;