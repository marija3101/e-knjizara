import Helmet from 'react-helmet';

import React, { useState, useEffect } from "react";

const url = "https://api.quotable.io/random";

const Home = () => {
  const [quotes, setQuotes] = useState([]);


  const getQuote = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setQuotes(data));
  };

  useEffect(() => {
    getQuote();
  }, []);

  const getNewQuote = () => {
    getQuote();
  };



  const { content, author } = quotes;
  return (
    <div class="page"><Helmet>

    <style>
       {`
         body {   background: #141E30; 
            background: -webkit-linear-gradient(to right, #243B55, #141E30);  
            background: linear-gradient(to right, #243B55, #141E30); 
            background-size: 50px 50px;
            font-family: 'K2D', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(100vh - 100px);
            overflow-y: hidden; }
            .navv {
            position: fixed;
             margin:0;
             top: 0;
              width: 100%;
              background-color: white;
              color: black;

              }
              .n {
                display: flex;
                justify-content: center;
              }

       `}
    </style></Helmet>
    <div className="con">
    <div className="box-centerside">
      <div className="text">
        <p>{content}</p>
      </div>
      <div className="author">
        <h5>{author}</h5>
        <div className="button-container" style={{justifyContent: 'center'}}>
          <button onClick={getNewQuote} >New Quote</button>
        </div>
      </div>
    </div>
    </div>
</div>

  );
};

export default Home;
