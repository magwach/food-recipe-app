import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context";



export default function Details() {

    const params = useParams();
    const { id } = params;
    const { recipeDetails, setRecipeDetails, handleFavourites, checkFavourites, setActiveBar } = useContext(GlobalContext);

    function fetchRecipeDetails() {
        fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
            .then(response => {
                if (!response.ok) throw new Error(`Error fetching`);
                return response.json();
            })
            .then((data) => {
                if (data?.recipe) setRecipeDetails(data)
            })
            .catch((err) => {
                console.log(err)
            });

    }

    useEffect(() => {
        fetchRecipeDetails();
        setActiveBar("Details");
    }, [])

    return (
        <>
            {
                recipeDetails?.recipe ?
                    <div className={"grid grid-cols-2 gap-8  text-[#f8f8f8] h-auto"}>
                        <img src={recipeDetails.recipe.image_url} className="h-[70vh]  hover:scale-105 duration-200" />
                        <div className="flex flex-col justify-items-start gap-4 ">
                            <a href={recipeDetails.recipe.source_url} target="_blank" className="text-sm lg:text-2xl text-[#3274cd] font-medium hover:text-[#FFD54F] mb-1 lg:mb-4" >{recipeDetails.recipe.publisher}</a>
                            <div className="flex flex-row justify-between">
                                <p className="text-sm lg:text-2xl font-extrabold ">{recipeDetails.recipe.title}</p>
                                {
                                    checkFavourites(recipeDetails.recipe) ?
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="fill-[#1c1c1c] stroke-[#f8f8f8] stroke-2 size-9 cursor-pointer transition-all duration-300 ease-in-out"
                                            onClick={() => handleFavourites(recipeDetails.recipe)}
                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        :
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="fill-red-600 stroke-none size-9 cursor-pointer transition-all duration-300 ease-in-out"
                                            onClick={() => handleFavourites(recipeDetails.recipe)}
                                        >
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                }
                            </div>
                            <p className="text-sm lg:text-2xl">Ingredients: </p>
                            <ul>
                                {
                                    recipeDetails.recipe.ingredients.map(item => {
                                        return (
                                            <li className="text-sm lg:text-2xl mb-4 lg;mb-9">{item}</li>
                                        )
                                    })
                                }
                            </ul>

                        </div>
                    </div>

                    : null
            }
        </>
    )
}
