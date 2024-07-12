import { useState } from "react";
import { Link } from "react-router-dom";


const BurgerMenu = () => {
    const [dropdownVisibe, setDropdownVisible] = useState(false);

    const handleBurgerClick = () => {
        setDropdownVisible(!dropdownVisibe);
    }

    return (
        <div className="burger-menu">
            <div className="burger" onClick={handleBurgerClick}>
                <span className={`top ${dropdownVisibe ? 'visible': ''}`}></span>
                <span className={`middle ${dropdownVisibe ? 'visible': ''}`}></span>
                <span className={`bottom ${dropdownVisibe ? 'visible': ''}`}></span>
            </div>
            <div className={`burger-content ${dropdownVisibe ? 'visible': ''}`}>
                <div className="burger-buttons">
                    <button>Log in</button>
                </div>
                <div className="burger-links">
                    <Link
                        onClick={handleBurgerClick}
                        to="/pair-device"
                    >Pair device</Link>
                    <Link
                        onClick={handleBurgerClick}
                        to="/settings"
                    >Settings</Link>
                    <Link
                        onClick={handleBurgerClick}
                        to="/useful-links"
                    >Useful links</Link>
                    <Link
                        onClick={handleBurgerClick}
                        to="/about"
                    >About</Link>
                    <Link
                        onClick={handleBurgerClick}
                        to="/contact"
                    >Contact</Link>
                    <Link
                        onClick={handleBurgerClick}
                        to="/donate"
                    >Donate</Link>
                </div>
            </div>
        </div>
    );
};


export default BurgerMenu;