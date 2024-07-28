import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({children}) {
  return (
    <div className="navbar">
      <div className="navbar__logo">LOGO 😍 </div>
      {children}
    </div>
  );
}

export default Navbar;

export function SearchResults({numOfResults}) {
  return (
    <p className="navbar__result">
      found {numOfResults} results
    </p>
  );
}

export function Search({setQuery , query}) {
  return <input value={query} onChange={(e)=>setQuery(e.target.value)} type="text" className="text-field" placeholder="search..." />;
}
export function Favorites({ numOfFavorites }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{ numOfFavorites}</span>
    </button>
  );
}