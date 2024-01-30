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
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'userhome',
                element: <UserHome></UserHome>,
            },
            {
                path: 'tasks',
                element: <Tasks></Tasks>
            },
            {
                path: 'mytasks',
                element: <MyTasks></MyTasks>
            },
            {
                path: 'addTask',
                element: <AddTask></AddTask>
            },
            {
                path: 'updateTask/:id',
                element: <UpdateTask></UpdateTask>,
                loader: ({params})=> fetch(` https://taskia-server.vercel.app/singleTask/${params.id}`)
            },
            {
                path: 'postComments/:id',
                element: <PostDetails></PostDetails>,
                loader: ({params})=> fetch(` https://taskia-server.vercel.app/singleTask/${params.id}`)
            }
        ]
    },



]);