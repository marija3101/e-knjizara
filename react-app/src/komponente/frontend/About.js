import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";
import axios from "axios";

const About = () => {
  const [viewBook, setBook] = useState(
    []
  );
  useEffect(() => {
    document.title = "View Book";
    axios
      .get("/api/view-book")
      .then((res) => {
        if (res.data.status === 200) {
          setBook(res.data.books);
        }
      });
  }, []);

  var viewbooks_HTMLTABLE = "";
  viewbooks_HTMLTABLE = viewBook
    .toReversed()
    .slice(0, 4)
    .map((item, idx) => {
      return (
        <div
          className="col-md-3"
          key={idx}
        >
          <div
            className="card"
            style={{
              position: "inherit",
            }}
          >
            <Link
              to={`/collections/${item.author.slug}/${item.slug}`}
            >
              <img
                src={`http://localhost:8000/${item.image}`}
                className="w-100"
                alt={item.title}
              />
            </Link>
            <div className="card-body">
              <Link
                to={`/collections/${item.author.slug}/${item.slug}`}
                style={{
                  textDecoration:
                    "none",
                  color: "black",
                  textAlign: "center",
                }}
              >
                <h5>{item.title}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  return (
    <div>
      <div className="about-section">
        <img
          src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/294/original/YIB-HERO-Bookshop-Ad-2048x600-New-Jan24.jpg?1705419249"
          className="w-full"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <h1>About Us</h1>
        <h4>Welcome to our world</h4>
        <p>
          Bookstores are special places,
          full of the smell of new
          books, browsing the shelves
          for your next great read,
          booksellers you know you can
          count on for great, personal
          recommendations, a community
          you know will be open and
          welcoming.We know that
          booksellers help readers
          discover and share the magic
          of books. They are dedicated
          to helping you find the book
          you need--the book that could
          change your life. When they
          recommend a book to you, they
          are genuinely looking to make
          a connection and create an
          experience for you. We want to
          give you a way to celebrate
          your favorite bookstore with
          with other book lovers: just
          use the #loveyourbookstore
          hashtag and post a photo,
          quote, or story about your
          favorite bookstore.
        </p>
      </div>

      <h2
        style={{ textAlign: "center" }}
      >
        Our latest books
      </h2>

      <div className="py-3">
        <div className="container">
          <div className="row">
            {viewbooks_HTMLTABLE}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
