import { useNavigate } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";



const NavBar = () => {
    const navigate = useNavigate();

    const goToMainPage = () => {
        navigate('/home');
    }

    return (
        <div className="nav">
            <div
                className="logo-wrapper"
                onClick={goToMainPage}
            >
                <img className="logo" src="./src/assets/bby-logo.svg" alt="Baby logo" />
            </div>
            <BurgerMenu />
        </div>
    );
};


export default NavBar;