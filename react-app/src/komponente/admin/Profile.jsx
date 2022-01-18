import React from "react";



import 'jquery/dist/jquery.min.js';

import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { useState, useEffect } from 'react';
import axios from 'axios';


const Profile = () => {



    useEffect(() => {
      setTimeout(()=>{
        $("#example").DataTable({
          destroy: true,
          dom: "rBftlip",
          buttons: [
            {

            },
          ],
          lengthMenu: [
            [10, 20, 50, 100, -1],
            [10, 20, 50, 100, "All"],
          ],
          pageLength: 10,
      });
      },1000)
  }, [])

 

const [viewUser, setUser] = useState([]);
useEffect(() => {
    document.title = "View User";
      axios
        .get('/api/all-users')
        .then(res => {
            console.log(res.data.user);
          if (res.data.status === 200) {
              setUser(res.data.user);
   
            }
        
            
        });
    }, []);

   var viewauthor_HTMLTABLE =
    viewUser.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
        </tr>
      );
    });





return (
  <div className="MainDiv">
  <div class="jumbotron text-center bg-sky">
      <h3>Table users</h3>
  </div>


  <div className="container">
      
      <table id="example" class="display">
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
            </tr>
        </thead>
        <tbody>
            {viewauthor_HTMLTABLE}
        </tbody>
    </table>
      </div>

</div>

);
}



export default Profile;
