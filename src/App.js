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

  const fetchRef = useRef(true);

  const fetchImages = async () => {
    setIsLoading(true);

    let url;
    url = `${mainURL}${clientID}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(data);
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
  }, []);

  return (
    <>
      <header className="App">
        <h1>MySplash</h1>
        <p>your own stock photo resource</p>
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
        <div>
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
