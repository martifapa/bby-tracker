import BurgerMenu from "./BurgerMenu";



const NavBar = () => {
    return (
        <div className="nav">
            <div className="logo-wrapper">
                <img className="logo" src="./src/assets/bby-logo.svg" alt="Baby logo" />
            </div>
            <BurgerMenu />
        </div>
    );
};


export default NavBar;