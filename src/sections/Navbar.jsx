import {useState} from "react";
import {navLinks} from "../constans/index.js";

const NavItems = () =>{
    return(
        <ul className="nav-ul">
            {navLinks.map(({ id, href, name}) => (
               <li key={id} className="nav-li">
                <a href={href} className="nav-li_a" onClick={() => {}}>
                    {name}
                </a>
               </li>
            ))}
        </ul>
    )
}

const Navbar = () => {

    //State for hamburger menu
    const [isOpen, setIsOpen] =useState(true);
    const toggleMenu = () => setIsOpen(prevIsOpen => !prevIsOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center py-5 mx-auto c-space">
                    <a href="/"
                       className="text-white font-bold text-4xl font-signature hover:text-gray-300 transition-all">
                        Reimo Namm
                    </a>

                    {/*HAMBURGER ICON*/}
                    <button onClick={toggleMenu}
                            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
                            aria-label="Toggle Menu">
                        <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" className="w-6 h-6"/>
                    </button>

                    {/*DESKTOP NAV*/}
                    <nav className="sm:flex" hidden>
                        <NavItems></NavItems>
                    </nav>
                </div>
            </div>

            {/*MOBILE NAV*/}
            <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
                <nav className="p-5">
                    <NavItems/>
                </nav>
            </div>
        </header>
    )
}
export default Navbar
