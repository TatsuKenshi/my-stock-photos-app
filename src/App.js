import React, { useState, useEffect, useRef } from "react";
import Photo from "./Photo";
import { FaSearch } from "react-icons/fa";
import "./App.scss";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const mainURL = `https://api.unsplash.com/photos/`;
const searchURL = `https://api.unsplash.com/search/photos/`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  console.log(photos);
  console.log(page);

  const fetchRef = useRef(true);
  const scrollRef = useRef(true);
  const pageRef = useRef(true);

  const fetchImages = async () => {
    setIsLoading(true);

    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (!query) {
      url = `${mainURL}${clientID}${urlPage}`;
    } else {
      url = `${searchURL}${clientID}${urlPage}${urlQuery}`;
    }
    console.log(url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query && page !== 1) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setPhotos([]);
    fetchImages();
    pageRef.current = true;
  };

  useEffect(() => {
    if (fetchRef.current) {
      fetchRef.current = false;
      fetchImages();
      pageRef.current = true;
    }
  }, [page]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current = false;
      const event = window.addEventListener("scroll", () => {
        if (
          !isLoading &&
          pageRef.current &&
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
        ) {
          pageRef.current = false;
          setPage((prev) => {
            return prev + 1;
          });
          fetchRef.current = true;
        }
      });

      return () => window.removeEventListener("scroll", event);
    }
  }, []);

  return (
    <>
      <header className="App">
        <h1>MySplash</h1>
        <p>your number 1 stock photo resource</p>
      </header>
      <section>
        <form>
          <input
            type="text"
            placeholder="search photos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
        {isLoading && <h2>Loading...</h2>}
      </section>
    </>
  );
}

export default App;
