import Navbar, { Favorites, Search, SearchResults } from "./components/Navbar";
import CharacterList, { Character } from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail.jsx";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import { Toaster, toast } from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/outline";
import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { characters, isLoading } = useCharacter(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);
  const [ favorites , setFavorites]=useLocalStorage("FAVORITES" ,[])




  //!another way with fetch
  // async function fetchData() {
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch("https://rickandmortyapi.com/api/charactedsdsr");
  //     if (!res.ok) throw new Error("Something went wrong!");
  //     toast.success("Data loaded successfully!");
  //     const data = await res.json();
  //     setCharacters(data.results.slice(0, 5));
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  // fetchData();

  //*localStorage for favorites
  
  const handleSelectedId = (id) => {
    setSelectedId((prev) => (prev == id ? null : id));
  };
  const handleFavorites = (character) => {
    setFavorites((prev) => [...prev, character]);
  };
  const isAddToFavorites = favorites.map((fav) => fav.id).includes(selectedId);

  const handleRemoveFav = (id) => {
    console.log(id);
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search setQuery={setQuery} query={query} />
        <SearchResults numOfResults={characters.length} />
        <Favorites numOfFavorites={favorites.length}>
          {favorites.map((fav) => (
            <Character item={fav} key={fav.id}>
              <TrashIcon
                className="icon red"
                onClick={() => handleRemoveFav(fav.id)}
              />
            </Character>
          ))}
        </Favorites>
      </Navbar>
      {isLoading ? (
        <Loader />
      ) : (
        <Main>
          <CharacterList
            characters={characters}
            onSelectedId={handleSelectedId}
            selectedId={selectedId}
          />
          <CharacterDetail
            selectedId={selectedId}
            addToFavorites={handleFavorites}
            isAddToFavorites={isAddToFavorites}
          />
        </Main>
      )}
    </div>
  );
}

export default App;

// example for component composition
function Main({ children }) {
  return <div className="main">{children}</div>;
}
