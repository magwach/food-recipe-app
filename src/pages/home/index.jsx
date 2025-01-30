import { useContext, useRef } from "react"
import { MdError } from "react-icons/md";
import { GlobalContext } from "../../context"
import { Link } from "react-router-dom";


export default function Home() {
    const { loading, errMsg, recipeData, dataErr, search, setActiveBar } = useContext(GlobalContext);

    setActiveBar("Home")
    return (
        <div className={loading || errMsg || dataErr ? "flex flex-col items-center" : recipeData?.recipes?  "grid grid-cols-3 gap-4 place-items-center" : "text-center"}>
            {
                loading ? <div className="flex flex-col items-center gap-2">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                    </div>
                </div> : errMsg ?
                    <div className="flex flex-col items-center">
                        <MdError className="bg-red-500 size-20" />
                        <h2 className="text-red-500">An Error Occured: {errMsg}</h2>
                    </div> : dataErr ?
                        <div className="flex flex-col items-center">
                            <MdError className="bg-red-500 size-20" />
                            <h2 className="text-red-500">The recipes for {search} cannot be found</h2>
                        </div>
                        : recipeData?.recipes ? 
                            recipeData.recipes.map((item, key) => {
                                return(
                                    <div key={key} className="flex flex-col p-4 bg-[#f8f8f8] h-80 lg:h-150 rounded-lg hover:h-85 duration-100 hover:w-70 cursor-pointer lg:hover:h-160 lg:hover:w-130 hover:z-1">
                                        <img src={item.image_url} alt={item.image_url} className="rounded-lg h-1/2 w-screen mb-4"/>
                                        <a href={item.publisher_url} target="_blank" className="text-sm lg:text-2xl text-[#3274cd] font-medium hover:text-[#FFD54F] mb-2 lg:mb-6">{item.publisher}</a>
                                        <p className="text-[#1c1c1c] font-bold text-sm lg:text-2xl">{item.title}</p>
                                        <Link to={`/details/${item.recipe_id}`} onClick={() => setActiveBar('Details')} className="w-full py-2 text-sm lg:text-2xl font-medium text-[#f8f8f8] bg-[#3274cd] hover:bg-[#1c1c1c] rounded-xl mt-3 lg:mt-11 text-center tracking-wider">Recipe Details</Link>
                                    </div>
                                )
                            })
                        : <div className="text-[#f8f8f8] font-bold">Enter the name of the food to then hit enter to search</div>
            }
        </div>
    )
}