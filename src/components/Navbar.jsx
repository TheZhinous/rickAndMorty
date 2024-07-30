import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";

function Navbar({ children }) {
  return (
    <div className="navbar">
      <div className="navbar__logo">LOGO 😍 </div>
      {children}
    </div>
  );
}

export default Navbar;

export function SearchResults({ numOfResults }) {
  return <p className="navbar__result">found {numOfResults} results</p>;
}

export function Search({ setQuery, query }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}
export function Favorites({ numOfFavorites , children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Modal onOpen={setIsOpen} open={isOpen} title="List Of Favorites">
      {children}
      </Modal>
      <button className="heart" onClick={()=>setIsOpen(true)}>
        <HeartIcon className="icon" />
        <span className="badge">{numOfFavorites}</span>
      </button>
    </div>
  );
}

