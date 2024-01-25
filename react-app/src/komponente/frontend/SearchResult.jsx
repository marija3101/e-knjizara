import React from "react";
import "./SearchResult.css";

import { Link } from "react-router-dom";
import axios from "axios";

export const SearchResult = ({
  results,
  setInput,
  setResults,
  input,
}) => {
  const handelChange = () => {
    setInput("");
    fetchData();
  };
  const fetchData = () => {
    setResults([]);
  };

  const handl = (result) => {
    setInput(result.title);
    newData(result.title);
  };

  const newData = (value) => {
    axios
      .get("/api/view-book")
      .then((res) => {
        const results =
          res.data.books.filter(
            (book) => {
              return (
                value &&
                book &&
                ((book.title &&
                  book.title
                    .toLowerCase()
                    .includes(value)) ||
                  (book.title &&
                    book.title.includes(
                      value
                    )))
              );
            }
          );

        console.log(results);
        setResults(results);
      });
  };

  return (
    <div
      style={{ position: "absolute" }}
    >
      <div
        style={{
          width: "200px",
          display: "flex",
          backgroundColor: "whitesmoke",
          flexDirection: "column",
          marginTop: "1px",
          maxHeight: "120px",
          overflowY: "scroll",
          borderBottomWidth: "2px",
        }}
      >
        {results != "" ? (
          <>
            {input == "" ? (
              <></>
            ) : (
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                recommendations:
              </p>
            )}
            {results.map(
              (result, id) => {
                return (
                  <div
                    className="col-md-5"
                    key={id}
                    onClick={(e) =>
                      handl(result)
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection:
                          "row",
                        gap: "20px",
                      }}
                    >
                      <h7>
                        {
                          result.metatitle
                        }
                      </h7>
                    </div>
                  </div>
                );
              }
            )}
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="results-list">
        {results != "" ? (
          <>
            {input == "" ? (
              <></>
            ) : (
              <p
                style={{
                  fontWeight: "bold",
                }}
              >
                books:
              </p>
            )}
            {results.map(
              (result, id) => {
                return (
                  <div
                    className="col-md-5"
                    key={id}
                  >
                    <div className="lista-pod">
                      <div className="deo">
                        <Link
                          to={`/collections/${result.author.slug}/${result.slug}`}
                          onClick={
                            handelChange
                          }
                        >
                          <img
                            src={`http://localhost:8000/${result.image}`}
                            style={{
                              width:
                                "70px",
                              height:
                                "100px",
                            }}
                            alt={
                              result.title
                            }
                          />
                        </Link>
                      </div>
                      <div className="deo">
                        <Link
                          to={`/collections/${result.author.slug}/${result.slug}`}
                          style={{
                            textDecoration:
                              "none",
                            color:
                              "black",
                          }}
                          onClick={
                            handelChange
                          }
                        >
                          <h7>
                            {
                              result.title
                            }
                          </h7>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
