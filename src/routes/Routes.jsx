import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../layout/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layout/Dashboard";
import Tasks from "../pages/Dashboard/Tasks/Tasks";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import Fqa from "../pages/FQA/Fqa";
import Features from "../pages/Features/Features";
import AddTask from "../pages/Dashboard/AddTask/AddTask";

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
                path: "/fqa",
                element: <Fqa></Fqa>
            },
            {
                path: "/features",
                element: <Features></Features>
            }




        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'userhome',
                element: <UserHome></UserHome>
            },
            {
                path: 'tasks',
                element: <Tasks></Tasks>
            },
            {
                path: 'addTask',
                element: <AddTask></AddTask>
            }
        ]
    },



]);