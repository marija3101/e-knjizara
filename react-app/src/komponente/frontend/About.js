import React from 'react'
import NavBar from "../NavBar";
import { Helmet } from 'react-helmet';

const About = () => {
    return (
        <div className="page"><Helmet>

        <style>
           {`
           .carousel-inner img {
            width: 100%;
            height: 50%;
        }
        .carousel-caption {
            position: absolute;
            top: 20%;
            transform: translateY(-50);
        }
        .carousel-caption h1 {
            font-size: 500%;
            text-transform: uppercase;
            text-shadow: 1px 1px 15px #000;
        }
        .carousel-caption h3 {
            font-size: 200%;
            font-weight: 500;
            text-shadow: 1px 1px 10px #000;
            padding-bottom: 1rem;
        }
        .btn-primary {
            background-color: #6648b1;
            border: 1px solid #6648b1;
        }
        .btn-primary:hover {
            background-color: #563d7c;
            border: 1px solid #563d7c;
        }
        .padding {
            padding-bottom: 2rem;
        }
    
           `}
        </style></Helmet>
        <div>
        <div id="slides" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" margin="auto" id="img2"/>
                <div className="carousel-caption">
                <h1>♥</h1>
                    <h1 className="display-2" style={{fontWeight: 'bold', fontFamily: 'sans-serif'}}>BOOKLAND</h1>
                    <a href="/"><button type="button" className="btn btn-outline-light btn-lg">HOME</button></a>
                    <a href="/collections"><button type="button" className="btn btn-primary btn-lg">OUR BOOKS</button></a>
                </div>
            </div>
        </div>
    </div>
    </div>

    <section id="about" style={{ backgroundColor: '#ffd9b3'}}>
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h2 className=" mt-0">About us</h2>
                        <hr className="divider divider-light" />
                        <p className="text-white-75 mb-4">
Bookstores are special places, full of the smell of new books, browsing the shelves for your next great read, booksellers you know you can count on for great, personal recommendations, a community you know will be open and welcoming.We know that booksellers help readers discover and share the magic of books. They are dedicated to helping you find the book you need--the book that could change your life. When they recommend a book to you, they are genuinely looking to make a connection and create an experience for you. We want to give you a way to celebrate your favorite bookstore with with other book lovers: just use the #loveyourbookstore hashtag and post a photo, quote, or story about your favorite bookstore.

</p>
                    </div>
                </div>
            </div>
        </section>
        
    </div>
    )
}

export default About;
