import React, { useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "./Loader";

function CharacterDetail({ selectedId, addToFavorites , isAddToFavorites }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  // *fetch a single character from api
  useEffect(() => {
    async function fetchCharacter() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((ep) => ep.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodeData].flat());
      } catch (error) {
        toast.error(error.response.data.error);
        setCharacter(null);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) fetchCharacter();
  }, [selectedId]);

  if (isLoading) {
    return (
      <div style={{ flex: 1 }}>
        <Loader />
      </div>
    );
  }
  if (!character || !selectedId)
    return (
      <div style={{ color: "white", flex: 1 }}>
        Please Select a Character 💜{" "}
      </div>
    );

  return (
    <div style={{ flex: 1 }} key={character.id}>
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img"
        />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{character.gender == "Male" ? "👨 " : " 👩 "}</span>
            <span>&nbsp;{character.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${character.status == "Dead" ? "red" : ""}`}
            ></span>
            <span> {character.species} </span>
            <span>- {character.status}</span>
          </div>
          <div className="location">
            <p>Last Known location : </p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
           { isAddToFavorites ? (
              <p>Already has been added to favorites ✅ </p>
            ) : (
              <button
                onClick={() => addToFavorites(character)}
                className="btn btn--primary"
              >
                Add To Favorites
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List of Episodes :</h2>
          <button>
            <ArrowUpCircleIcon className="icon" />
          </button>
        </div>
        <ul>
          {episodes.map((item, index) => (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, "0")} -{item.episode} :{" "}
                <strong>{item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
