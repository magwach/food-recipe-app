import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";


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
                                    checkFavourites(recipeDetails.recipe) ? <FcLike onClick={() => handleFavourites(recipeDetails.recipe)} className="size-7 lg:size-11 cursor-pointer float-right" /> :
                                        <div className="relative inline-block">
                                            <FcDislike onClick={() => handleFavourites(recipeDetails.recipe)} className="size-7 lg:size-11 cursor-pointer" />
                                            <div className="absolute top-1/2 left-0 w-full h-1 bg-[#f8f8f8] rotate-[45deg] "></div>
                                        </div>
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
