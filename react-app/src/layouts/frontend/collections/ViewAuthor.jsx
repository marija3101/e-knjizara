import React, {
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewAuthor() {
  const [loading, setLoading] =
    useState(true);
  const [author, setAuthor] = useState(
    []
  );

  useEffect(() => {
    let isMountered = true;

    axios
      .get(`/api/getAuthor`)
      .then((res) => {
        if (isMountered) {
          if (res.data.status === 200) {
            setAuthor(res.data.author);
            setLoading(false);
          }
        }
      });

    return () => {
      isMountered = false;
    };
  }, []);

  if (loading) {
    return (
      <h4>Loading Categories...</h4>
    );
  } else {
    var showAuthorList = "";
    showAuthorList = author.map(
      (item, idx) => {
        return (
          <div
            className="col-md-4"
            key={idx}
          >
            <div
              className="card"
              style={{
                background: "#b9c487",
                margin: "10px",
                borderColor: "#AC6758",
                borderWidth: "3px",
              }}
            >
              <div
                className="card-body"
                style={{
                  color: "black",
                  textDecoration:
                    "none",
                  textAlign: "center",
                }}
              >
                <Link
                  to={`collections/${item.slug}`}
                >
                  <h5>{item.name}</h5>
                </Link>
              </div>
            </div>
          </div>
        );
      }
    );
  }

  if (showAuthorList.length > 0) {
    return (
      <div>
        <div
          className="py-3"
          style={{
            backgroundColor: "#ffd9b3",
          }}
        >
          <div className="container">
            <h6>Author Page</h6>
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
    );
  } else {
    return (
      <div>
        <div className="py-3">
          <div className="container">
            <h6>Author Page</h6>
          </div>
        </div>

        <div className="py-3">
          <div className="container">
            <h4>No Collections</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewAuthor;
