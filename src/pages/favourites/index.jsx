import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context"
import { Link } from "react-router-dom";


export default function Favourites() {
    const { favourites, handleFavourites, setActiveBar } = useContext(GlobalContext);

    useEffect(() => {
        setActiveBar('Favourites')
    }, [])
    return (
        <div className={`${favourites.length ? 'grid grid-cols-3 gap-3 place-items-center h-auto' : 'text-center'}`}>
            {
                favourites.length ? favourites.map(item => {
                    return (
                        <div className="flex flex-col p-4 bg-[#f8f8f8] h-120 lg:h-150 rounded-lg cursor-pointer w-full">
                            <img src={item.image_url} alt={item.image_url} className="h-[50%]" />
                            <a href={item.publisher_url} target="_blank" className="text-sm lg:text-2xl text-[#3274cd] font-medium hover:text-[#FFD54F] mb-2 lg:mb-6">{item.publisher}</a>
                            <p className="text-[#1c1c1c] font-bold text-sm lg:text-2xl">{item.title}</p>
                            <Link to={`/details/${item.recipe_id}`} onClick={() => setSearch('')} className="w-full py-2 text-sm lg:text-2xl font-medium text-[#f8f8f8] bg-[#3274cd] hover:bg-[#1c1c1c] rounded-xl mt-3 lg:mt-11 text-center tracking-wider">Recipe Details</Link>
                            <button className="w-full py-2 h-[10%] text-sm lg:text-2xl font-medium text-[#f8f8f8] bg-[#1c1c1c] rounded-xl mt-1 lg:mt-8 text-center tracking-wider cursor-pointer" onClick={() => handleFavourites(item)}>Remove from favourites</button>
                        </div>
                    )
                })
                    : <div className="text-[#f8f8f8] font-bold">Nothing in the favourites to show</div>
            }
        </div>
    )
}