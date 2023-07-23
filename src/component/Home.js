import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Search.css";
function Home() {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    // Fetch user data and repositories
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        return fetch(data.repos_url);
      })
      .then((response) => response.json())
      .then((reposData) => {
        console.log(JSON.stringify(reposData))
        setRepos(reposData);
      })
      .catch((error) => console.error("Error fetching data: ", error));

    // Fetch user followers
    fetch(`https://api.github.com/users/${username}/followers`)
      .then((response) => response.json())
      .then((data) => {
        setFollowers(data.length);
      })
      .catch((error) => console.error("Error fetching followers: ", error));

    // Fetch user following
    fetch(`https://api.github.com/users/${username}/following`)
      .then((response) => response.json())
      .then((data) => {
        setFollowing(data.length);
      })
      .catch((error) => console.error("Error fetching following: ", error));
  }, [username]);

  return (
    <div className="Repo">
      <div className="Repo_card">
        <h2>Repositories</h2>
        <div className="repo-cards"> {/* Wrap repos in a container */}
          {repos.map((repo) => (
            <div className="repo-card" key={repo.id}> {/* Use the repo-card class */}
              <p><strong>Name:</strong> {repo.name}</p>
              <p><strong>Privacy:</strong> {repo.private ? "Private" : "Public"}</p>
              <a href={repo.html_url}>Go To Repo</a>
              <p className="language">
                <strong>Language Used:</strong>{" "}
                {repo.language ? repo.language : "Not specified"}
              </p>
            </div>
          ))}
          <div className="FollowContain">
          <div className="follow">
          <p>
            <b>Followers</b>: {followers}
          </p>
        </div>
        <div className="follow">
          <p>
            <b>Following</b>: {following}
          </p>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
