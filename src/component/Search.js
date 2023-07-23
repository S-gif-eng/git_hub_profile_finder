import React, { useState } from "react";
import "./Search.css";
import { Link } from "react-router-dom";

function Search() {
  const [profileName, setProfileName] = useState("");
  const [data, setData] = useState("");
  const [err, setError] = useState("");

  const handleInputChange = (event) => {
    setProfileName(event.target.value);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  const getData = () => {
    setData(null);
    setError(null);
    fetch(`https://api.github.com/users/${profileName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json(); // Extract JSON data from the response
      })
      .then((userData) => {
        console.log(JSON.stringify(userData));
        setData(userData);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container">
      <div className="searchbar">
        <pre>{profileName}</pre>
        <input
          type="text"
          placeholder="Enter Profile name"
          value={profileName}
          onChange={handleInputChange}
        />
        <button className="button" onClick={getData}>
          Seacrh
        </button>
      </div>
      {data && (
        <div className="user-details">
          <div>
            <img src={data.avatar_url} alt="User Avatar" />
          </div>
          <div>
            <h2>{data.name}</h2>
            <div className="bio">
              <p>{data.bio}</p>
            </div>
            <div className="bio">
              <p>
                <b>Public Repositories</b>: {data.public_repos}
              </p>
            </div>
            <div className="bio">
              <p>
                <b>Created date</b>: {formatDate(data.created_at)}
              </p>
            </div>
            {/* Use Link to navigate to Home and pass the user name as a parameter */}
            <Link to={`/home/${profileName}`}>
              <button className="detailsbut">Show Full Data</button>
            </Link>
          </div>
        </div>
      )}
      {err && <p className="error">Error: {err}</p>}
    </div>
  );
}

export default Search;
