import { Outlet, useLocation } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";


const Main = () => {
    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register');
    return (
        <div>
            {noHeaderFooter ||<Header></Header>}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;