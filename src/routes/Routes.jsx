import {
    createBrowserRouter,
} from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layout/Dashboard";
import Tasks from "../pages/Dashboard/Tasks/Tasks";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AddTask from "../pages/Dashboard/AddTask/AddTask";
import UpdateTask from "../pages/Dashboard/UpdateTask/UpdateTask";

export const router = createBrowserRouter([
{
        path: "/",
        element: <Login></Login>,
        children: [
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
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
            },
            {
                path: 'updateTask/:id',
                element: <UpdateTask></UpdateTask>,
                loader: ({params})=> fetch(`http://localhost:5000/update-task/${params.id}`)
            }
        ]
    },



]);