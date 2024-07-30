import React, { Children, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function CharacterList({ characters, onSelectedId, selectedId }) {
  return (
    <div className="characters-list">
      {characters.map((character) => {
        return (
          <Character item={character} key={character.id}>
            <button className="icon red" onClick={() => onSelectedId(character.id)}>
              {selectedId == character.id ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </Character>
        );
      })}
    </div>
  );
}

export default CharacterList;

export function Character({ item, children }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      {children}
    </div>
  );
}

export function CharacterName({ item }) {
  return (
    <h3 className="name">
      {item.gender == "Male" ? "👨 " : " 👩 "}
      {item.name}
    </h3>
  );
}

export function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={item.status == "Alive" ? "status" : "status red"}></span>
      <span> {item.species}</span>
      <span>- {item.status}</span>
    </div>
  );
}
