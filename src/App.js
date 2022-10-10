import React, { useState, useEffect, useRef, useCallback } from "react";
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
  console.log(photos);

  const fetchRef = useRef(true);
  const scrollRef = useRef(true);

  const fetchImages = async () => {
    setIsLoading(true);

    let url;
    const urlPage = `&page=${page}`;
    url = `${mainURL}${clientID}${urlPage}`;
    console.log(url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        return [...oldPhotos, ...data];
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("search...");
  };

  useEffect(() => {
    if (fetchRef.current) {
      fetchRef.current = false;
      fetchImages();
    }
  }, [page]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current = false;
      const event = window.addEventListener("scroll", () => {
        if (
          !isLoading &&
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
        ) {
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
          <input type="text" placeholder="search photos..." />
          <button type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {photos.map((photo, index) => {
            const { id } = photo;
            return <Photo key={id} {...photo} />;
          })}
        </div>
        {isLoading && <h2>Loading...</h2>}
      </section>
    </>
  );
}

export default App;
