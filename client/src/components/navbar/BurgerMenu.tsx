import { useState } from "react";

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
                    <p>Pair device</p>
                    <p>Settings</p>
                    <p>Useful links</p>
                    <p>About</p>
                    <p>Contact</p>
                    <p>Donate</p>
                </div>
            </div>
        </div>
    );
};


export default BurgerMenu;