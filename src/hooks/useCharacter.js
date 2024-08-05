//first of all we should check the states and hooks and all things that we used in that logic
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useCharacter(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    //*with axios
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}=${query}`, { signal });
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    // ?for filtering the query
    // if (query.length < 3) {
    //   // setCharacters([]);
    //   return;
    // }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { characters, isLoading };
}
