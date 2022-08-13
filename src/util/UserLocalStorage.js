import { useEffect, useState } from "react";

            //default value: string  //key identifies whichof the local items we want to store
function useLocalState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        //retieve item from local storage via key
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue !== null
        ? JSON.parse(localStorageValue)
        //if we cant get the json value then return its default type
        : defaultValue;
    });

    useEffect(() => {
                              //stringify will turn a json object into a string
    localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export { useLocalState };