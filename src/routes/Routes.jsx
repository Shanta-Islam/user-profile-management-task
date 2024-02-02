import {
    createBrowserRouter,
} from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

export const router = createBrowserRouter([
{
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/profile",
                element: <Profile></Profile>
            },
            {
                path: '/resetPassword',
                element: <ResetPassword></ResetPassword>

            }
        ]
    },


]);