import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context";
import { MdError } from "react-icons/md";


export default function Details() {

    const params = useParams();
    const { id } = params;
    const { recipeDetails, setRecipeDetails, handleFavourites } = useContext(GlobalContext);

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
    }, [])
    return (
        <>
            {
                recipeDetails?.recipe ?
                    <div className={"grid grid-cols-2 gap-8 place-items-center text-[#f8f8f8] h-auto"}>
                        <img src={recipeDetails.recipe.image_url} className="h-[70vh]  hover:scale-105 duration-200" />
                        <div className="flex flex-col justify-items-start gap-4 ">
                            <a href={recipeDetails.recipe.source_url} target="_blank" className="text-sm lg:text-2xl text-[#3274cd] font-medium hover:text-[#FFD54F] mb-1 lg:mb-4" >{recipeDetails.recipe.publisher}</a>
                            <p className="text-sm lg:text-2xl font-extrabold">{recipeDetails.recipe.title}</p>
                            <button onClick={() => handleFavourites(recipeDetails.recipe)} className="text-sm lg:text-2xl items-start border-2 bg-[#f8f8f8] rounded-lg text-[#1c1c1c] font-bold cursor-pointer">Add to favourites</button>
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
