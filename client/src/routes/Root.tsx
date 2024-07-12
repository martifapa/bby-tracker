import { Outlet } from "react-router-dom"
import NavBar from "../components/Navbar/NavBar"

const Root = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};


export default Root;