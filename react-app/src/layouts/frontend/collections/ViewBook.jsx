import React from 'react'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ViewBook = (props) => {
    const history=useHistory(); 
const [loading, setLoading]=useState(true);
const [book, setBook]=useState([]);
const [author, setAuthor]=useState([]);
const bookCount=book.length;
    useEffect(()=>{
        let isMounted=true
        const book_slug=props.match.params.slug; 
        axios.get(`/api/fetchbooks/${book_slug}`).then(res=>{
        if(isMounted) {
        if(res.data.status===200) {
        setBook(res.data.book_data.book);
        setAuthor(res.data.book_data.author);
        setLoading(false);
        }
        else if(res.data.status===400) {
        swal("Warning",res.data.message,"");
        }
        }
        else if(res.data.status===404) {
        history.push('/collections');
        swal("Warning",res.data.message,"error");
        }
        });
        return()=>{
        isMounted=false
        };
        }, [props.match.params.slug,history]);

        if(loading) {
            return <h4>Loading Books...</h4>
            }
            else {
            var showBookList='';
            if(bookCount) {
            showBookList=book.map((item,idx)=>{
            return (
            <div className="col-md-3" key={idx}>
            <div className="card">
            <Link to={`/collections/${item.author.slug}/${item.slug}`}>
            <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name}/>
            </Link>
            <div className="card-body">
            <Link to={`/collections/${item.author.slug}/${item.slug}`}  style={{ color: 'black', textDecoration: 'none', textAlign: 'center'}}>
            <h5>{item.title}</h5>
            </Link>
            </div>
            </div>
            </div>
            )
            });
            }
            else {
            showBookList=
            <div className="col-md-12">
            <h4>No book available for {author.name}</h4></div>
            }
            }
            
        
        
    
    return (
        <div>
	<div className="py-3" style={{ backgroundColor: '#ffd9b3'}}>
		<div className="container">
		<h6>Books / {author.name}</h6>
		</div>
	</div>
	<div className="py-3">
		<div className="container">
		<div className="row">
		{showBookList}
		</div>
		</div>
	</div>
</div>
    )
}

export default ViewBook
