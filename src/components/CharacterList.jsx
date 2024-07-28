import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function CharacterList({ characters, onSelectedId, selectedId }) {
  return (
    <div className="characters-list">
      {characters.map((character) => {
        return (
          <Charcter
            item={character}
            key={character.id}
            onSelectedId={onSelectedId}
            selectedId={selectedId}
          />
        );
      })}
    </div>
  );
}

export default CharacterList;

function Charcter({ item, onSelectedId, selectedId }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      <button className="icon red" onClick={() => onSelectedId(item.id)}>
        {selectedId == item.id ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      {item.gender == "Male" ? "👨 " : " 👩 "}
      {item.name}
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={item.status == "Alive" ? "status" : "status red"}></span>
      <span> {item.species}</span>
      <span>- {item.status}</span>
    </div>
  );
}
