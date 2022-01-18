import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const EditBook = (props) => {
    const history = useHistory();
    const [loading,setLoading]=useState(true);
    const [authorlist, setAuthorlist] = useState([]);
    const [bookInput, setBook] = useState({
        author_id: '',
        city_id: '',
        slug: '',
        price: '',
        title: '',
        description: '',
        });
        const [picture, setPicture] = useState([]);

        const [errorlist, setError] = useState([]);

        const handleInput =(e) =>{
            e.persist();
            setBook({...bookInput,[e.target.name]:e.target.value});
        }
        const handleImage =(e) =>{
            setPicture({ image: e.target.files[0]});
        }
    useEffect(() => {
    axios.get('/api/all-authors').then(res=> {
        if(res.data.status === 200) {
            setAuthorlist(res.data.author);
        }


    });
    const book_id=props.match.params.id
    axios.get(`/api/edit-book/${book_id}`).then(res=>{
        if(res.data.status===200) {
        setBook(res.data.book);
        }
        else if(res.data.status===404) {
        swal("Error",res.data.message,"error");
        history.push('/admin/view-book');
        }
        setLoading(false);
        });
        
    },


    [props.match.params.id, history]);

    const updateBook =(e)=> {
        e.preventDefault();
        const book_id=props.match.params.id
        const formData = new FormData();
        formData.append('image',picture.image);
        formData.append('author_id',bookInput.author_id);
        formData.append('city_id',bookInput.city_id);
        formData.append('slug',bookInput.slug);
        formData.append('price',bookInput.price);
        formData.append('title',bookInput.title);
        formData.append('description',bookInput.description);

    axios.post(`/api/update-book/${book_id}`, formData).then(res=>{
        if(res.data.status === 200) {
            swal("success", res.data.message,"success");

            setError([]);
        }
        else if(res.data.status === 422) {
            swal("All fields are mandetory","","error");
            setError(res.data.errors);
        }
else if(res.data.status===404) {

swal("Error",res.data.message,"error");

history.push('/admin/view-book');

}


    });
    }
    if(loading) {
        return <h4>Edit Product Data Loading...</h4>
        }

    return (
        <div className='container-fluid px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>Add Book 
                        <Link to="/admin/add-book" className='btn btn-primary btn-sm float-end'> View Book</Link>
                    </h4>
                </div>
                <div className='card-body'>
                <form
          id="" onSubmit={updateBook}
        >
             <div className="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label"
            >
              Select author
            </label>
            <select
              type="text"
              name="author_id"
              onChange={handleInput}
              value={bookInput.author_id}
              className="form-control"
              id="exampleInputPassword1">
                  {
                      authorlist.map((item)=> {
                          return (
                        <option value={item.id} key={item.id}>{item.name}</option>
                          )
                      })
                  }
                 
            </select>
            <small className='text-danger'>{errorlist.author_id}</small>
          </div>
          <div className="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label"
            >
              Select city
            </label>
            <select
              type="text"
              name="city_id"
              onChange={handleInput}
              value={bookInput.city_id}
              className="form-control"
              id="exampleInputPassword1">
                  <option>Select</option>
            </select>
            <span>
            </span>
          </div>
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
              value={bookInput.slug}
            />
      <small className='text-danger'>{errorlist.slug}</small>
          </div>
          <div className="mb-3">
            <label
              for="exampleInputEmail1"
              className="form-label"
            >
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="price"
              onChange={handleInput}
              value={bookInput.price}
            />
      <small className='text-danger'>{errorlist.price}</small>
          </div>
          <div className="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleInput}
              value={bookInput.title}
            />
           <small className='text-danger'>{errorlist.title}</small>
          </div>
          <div className="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleInput}
              value={bookInput.description}
            />
           <small className='text-danger'>{errorlist.description}</small>
          </div>

          <div className="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label"
            >
              Image
            </label>
            <input
              type="file"
              name="image"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleImage}

            />
            <img src={`http://localhost:8000/${bookInput.image}`} width="50px"/>
             <small className='text-danger'>{errorlist.image}</small>
          </div>
          <button
            type="submit"
            className="btn btn-primary px-4 mt-2"
          >
            Submit
          </button>
        </form>
                </div>
            </div>
           
        </div>
    )
}

export default EditBook;
