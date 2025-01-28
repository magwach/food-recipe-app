import { createContext, useState } from "react"
import { useNavigate } from 'react-router-dom';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [search, setSearch] = useState('');
    const [favourites, setFavourites] = useState([]);
    const [recipeData, setRecepieData] = useState('');
    const [recipeDetails, setRecipeDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataErr, setDataErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [activeBar, setActiveBar] = useState('Home');
    const navigate = useNavigate();

    function handleSubmit(event) {
        if (event) event.preventDefault();
        navigate('/')
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

    function handleFavourites(recipeItem) {
        let cpyFavourite = [...favourites];
        const index = cpyFavourite.findIndex(item => item.recipe_id === recipeItem.recipe_id);
        if (index === -1) cpyFavourite.push(recipeItem);
        else cpyFavourite.splice(index, 1);
        setFavourites(cpyFavourite)
    }

    function checkFavourites(recipeItem) {
        let cpyFavourite = [...favourites];
        const index = cpyFavourite.findIndex(item => item.recipe_id === recipeItem.recipe_id);
        if (index === -1) {
            return true
        }
        return false
    }

    useState(() => {
        if (search !== '') handleSubmit();
    }, [])
    return (
        <GlobalContext.Provider value={{ search, setSearch, handleSubmit, loading, recipeData, errMsg, dataErr, setDataErr, recipeDetails, setRecipeDetails, handleFavourites, favourites, checkFavourites, activeBar, setActiveBar }}>{children}</GlobalContext.Provider>
    )
}