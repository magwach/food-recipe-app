import { createContext, useState } from "react"

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [search, setSearch] = useState('Mango');
    const [favourites, setFavourites] = useState([]);
    const [recipeData, setRecepieData] = useState('');
    const [recipeDetails, setRecipeDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataErr, setDataErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    function handleSubmit(event) {
        if (event) event.preventDefault();
        setDataErr(false);
        setLoading(true)
        fetch(`https://forkify-api.herokuapp.com/api/search?q=${search}`)
            .then(response => {
                setLoading(false);
                if (!response.ok) setErrMsg(response.message)
                return response.json();
            })
            .then((data) => {
                setLoading(false)
                if (data?.recipes) setRecepieData(data)
                else if (data?.error) setDataErr(true)
            })
            .catch((err) => {
                setLoading(false)
                setErrMsg(err.message)
            });
    }


    function handleFavourites(item) {
        const cpyFavourite = [...favourites];
        

    }

    useState(() => {
        handleSubmit();
    }, [])
    return (
        <GlobalContext.Provider value={{ search, setSearch, handleSubmit, loading, recipeData, errMsg, dataErr, setDataErr, recipeDetails, setRecipeDetails, handleFavourites }}>{children}</GlobalContext.Provider>
    )
}