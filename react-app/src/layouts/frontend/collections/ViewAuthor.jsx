import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
function ViewAuthor()
{
const [author,setAuthor]=useState([]);
const [loading,setLoading]=useState(true);
useEffect(()=>{
	let isMountered=true;
axios.get('/api/getAuthor').then(res=>{
	if(isMountered) {

	
if(res.data.status===200)
{
console.log(res.data.author);
setAuthor(res.data.author);
setLoading(false);
}}
});

return () => {
	isMountered=false;
	}
});

if(loading)
{
return <h4>Loading authors...</h4>
}
else
{
var showAuthorList='';
showAuthorList=author.map((item,idx)=>{
return (
<div className="col-md-4" key={idx}>
		<div className="card" style={{background: '#b9c487', margin: "10px", borderColor: '#AC6758', borderWidth: '3px'}}>
		<div className="card-body" >
			<Link to={`collections/${item.slug}`} style={{ color: 'black', textDecoration: 'none', textAlign: 'center'}}
			>
		<h5>{item.name}</h5>
			</Link>
		</div>
		</div>
	</div>
)
})
}

return(
<div>
	<div className="py-3" style={{ backgroundColor: '#ffd9b3'}}>
		<div className="container">
		<h6>Authors</h6>
		</div>
	</div>
	<div className="py-3">
		<div className="container">
		<div className="row">
		{showAuthorList}
		</div>
		</div>
	</div>
</div>
)
}
export default ViewAuthor;
