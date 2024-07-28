import React from "react";
import { HeartIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <div className="navbar__logo">LOGO</div>
        <input
          type="text"
          className="text-filed navbar__search-box"
          placeholder="search ..."
        />
        <p className="navbar__result">
          found{" "}
          <span>
            <strong>X</strong>{" "}
          </span>
          results
        </p>
        <div className="heart">
          <span>1</span>
          <HeartIcon className="navbar__heart" />
        </div>
      </div>
      <div className="character-list">
        <div className="list">
          <div className="list-item">
            <div className="list-item__info">
              <img src="../public/assets/download.jpg" alt="profile" />

              <p className="name">man rick name</p>
              <p className="status">dead - human</p>
            </div>
            <div>
              <EyeIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="character-detail">character-detail</div>
    </div>
  );
}

export default App;
