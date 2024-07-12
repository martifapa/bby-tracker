import NavBar from "../components/Navbar/NavBar";
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <>
            <NavBar />
            <div className="error-page">
                <h2>Oops!</h2>
                <p>Sorry, an error occurred</p>
                <Link to='/home' className="button">Go back</Link>
            </div>
        </>
    );
};


export default ErrorPage;