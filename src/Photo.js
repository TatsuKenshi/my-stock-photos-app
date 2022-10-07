import React from "react";

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
      <div>
        <img src={regular} alt={alt_description} width="300px" />
      </div>
      {/* info div */}
      <div style={{ display: "flex" }}>
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
