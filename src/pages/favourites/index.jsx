import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context"
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";



export default function Favourites() {
    const { favourites, handleFavourites, setActiveBar, setRecipeDetails } = useContext(GlobalContext);

    useEffect(() => {
        setActiveBar('Favourites')
    }, [])
    return (
        <div className={`${favourites.length ? 'grid grid-cols-3 gap-3 place-items-center h-auto' : 'text-center'}`}>
            {
                favourites.length ? favourites.map(item => {
                    return (
                        <div className="flex flex-col p-4 bg-[#f8f8f8] h-120 lg:h-150 rounded-lg cursor-pointer w-full hover:scale-105 duration-200 hover:z-1">
                            <img src={item.image_url} alt={item.image_url} className="h-[50%]" />
                            <a href={item.publisher_url} target="_blank" className="text-sm lg:text-2xl text-[#3274cd] font-medium hover:text-[#FFD54F] mb-2 lg:mb-6">{item.publisher}</a>
                            <p className="text-[#1c1c1c] font-bold text-sm lg:text-2xl">{item.title}</p>
                            <Link to={`/details/${item.recipe_id}`} className="w-full py-2 text-sm lg:text-2xl font-medium text-[#f8f8f8] bg-[#3274cd] hover:bg-[#1c1c1c] rounded-xl mt-3 lg:mt-11 text-center tracking-wider">Recipe Details</Link>
                            <button className="w-full py-2 h-[10%] text-sm lg:text-2xl font-medium text-[#f8f8f8] bg-[#1c1c1c] rounded-xl mt-1 lg:mt-8 text-center tracking-wider cursor-pointer hover:bg-[#d43737] duration-200" onClick={() => handleFavourites(item)}>Remove from favourites</button>
                        </div>
                    )
                })
                    : <div className="text-[#f8f8f8] font-bold">Nothing in the favourites to show. Tap on "<span className="inline-block align-text-bottom" >
                         <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="fill-[#1c1c1c] stroke-[#f8f8f8] stroke-2 size-4 cursor-pointer transition-all duration-300 ease-in-out"
                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                        </span>" in the details page to add an item to the favourites </div>
            }
        </div>
    )
}