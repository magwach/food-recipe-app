import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";


export default function NavBar() {

    const { search, setSearch, handleSubmit, setDataErr, activeBar, setActiveBar } = useContext(GlobalContext)
    return (
        <nav className="flex justify-between items-center py-8 px-7 container w-100% lg:flex-row gap-5 lg:gap-0 lg:justify-between bg-[#1c1c1c] mx-auto mb-5 border-2 border-solid border-white rounded-full">
            <NavLink to={'/details/3'} className={`${activeBar === 'Details'? 'text-[#FFD54F]' : 'text-[#f8f8f8]'} text-lg font-semibold hover:text-[#FFD54F] duration-100 `} onClick={() => setActiveBar('Details')} >Recipe Details</NavLink>
            <form onSubmit={e => handleSubmit(e)}><input type="text" value={search} onChange={(event) => {
                setSearch(event.target.value)
                setDataErr(false)
            }} placeholder="Enter food.." className="bg-[#f8f8f8] w-50 lg:w-150 border-none rounded-full focus:outline-none text-center text-lg text-[#1c1c1c]" /></form>
            <ul className="flex justify-around gap-3 lg:gap-10">
                <li><NavLink to={'/'} className={`${activeBar === 'Home'? 'text-[#FFD54F]' : 'text-[#f8f8f8]'} text-lg font-semibold hover:text-[#FFD54F] duration-100`} onClick={() => {
                    setActiveBar('Home')
                    setSearch(search)
                    }} >Home</NavLink></li>
                <li><NavLink to={'/favourites'} className={` ${activeBar === 'Favourites'? 'text-[#FFD54F]' : 'text-[#f8f8f8]'} text-lg font-semibold hover:text-[#FFD54F] duration-100`} onClick={() => setActiveBar('Favourites')} >Favourites</NavLink></li>
            </ul>
        </nav>
    )
}