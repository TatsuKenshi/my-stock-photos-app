import React from "react";
import "./Photo.scss";

const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <article>
      <div className="imgDiv">
        <img src={regular} alt={alt_description} />
      </div>
      {/* info div */}
      <div className="infoDiv">
        <h4>{name}</h4>
        <p>{likes}</p>
        <a href={portfolio_url}>
          <img src={medium} alt={name} />
        </a>
      </div>
      {/* end of info div */}
    </article>
  );
};

export default Photo;
