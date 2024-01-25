import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

import axios from "axios";

export const SearchBar = ({
  setResults,
  input,
  setInput,
}) => {
  /*const [input, setInput] =
    useState("");*/

  const fetchData = (value) => {
    axios
      .get("/api/view-book")
      .then((res) => {
        const results =
          res.data.books.filter(
            (book) => {
              return (
                (value &&
                  book &&
                  ((book.title &&
                    book.title
                      .toLowerCase()
                      .includes(
                        value
                      )) ||
                    (book.title &&
                      book.title.includes(
                        value
                      )))) ||
                (value &&
                  book &&
                  ((book.description &&
                    book.description
                      .toLowerCase()
                      .includes(
                        value
                      )) ||
                    (book.description &&
                      book.description.includes(
                        value
                      )))) ||
                (value &&
                  book &&
                  ((book.author.name &&
                    book.author.name
                      .toLowerCase()
                      .includes(
                        value
                      )) ||
                    (book.author.name &&
                      book.author.name.includes(
                        value
                      )))) ||
                (value &&
                  book &&
                  ((book.metakeywords &&
                    book.metakeywords
                      .toLowerCase()
                      .includes(
                        value
                      )) ||
                    (book.metakeywords &&
                      book.metakeywords.includes(
                        value
                      )))) ||
                (value &&
                  book &&
                  ((book.metatitle &&
                    book.metatitle
                      .toLowerCase()
                      .includes(
                        value
                      )) ||
                    (book.metatitle &&
                      book.metatitle.includes(
                        value
                      ))))
              );
            }
          );

        console.log(results);
        setResults(results);
      });
  };

  const handelChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) =>
          handelChange(e.target.value)
        }
      />
    </div>
  );
};
