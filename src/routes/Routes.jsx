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
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import MyTasks from "../pages/Dashboard/MyTasks/MyTasks";
import PostDetails from "../pages/Dashboard/PostDetails/PostDetails";
import Features from "../pages/Features/Features";
import PrivateRoute from "./PrivateRoute";

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
                path: '/features',
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
                element: <PrivateRoute><UserHome></UserHome></PrivateRoute>,
            },
            {
                path: 'tasks',
                element: <PrivateRoute><Tasks></Tasks></PrivateRoute>
            },
            {
                path: 'mytasks',
                element: <PrivateRoute><MyTasks></MyTasks></PrivateRoute>
            },
            {
                path: 'addTask',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path: 'updateTask/:id',
                element: <PrivateRoute> <UpdateTask></UpdateTask></PrivateRoute>,
                loader: ({params})=> fetch(` https://taskia-server.vercel.app/singleTask/${params.id}`)
            },
            {
                path: 'postComments/:id',
                element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
                loader: ({params})=> fetch(` https://taskia-server.vercel.app/singleTask/${params.id}`)
            }
        ]
    },



]);