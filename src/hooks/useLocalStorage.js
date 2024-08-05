import { useEffect, useState } from "react";

export default function useLocalStorage(key , initialState) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
    
    return [value, setValue];
}

//! the return is an array as state so the order of value and setValue is important
//! maybe we want to use this hook in different places so it could be object or boolean or anything
//! so we pass initial state to this hook to declare the type of datas