import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { HiHome, HiListBullet, HiMiniPlusCircle, HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { FaBell } from "react-icons/fa6";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(true);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);
    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success('Successfully Log Out');
                navigate("/login");
            })
            .catch()
    }
    useEffect(() => {
        const url = ` https://taskia-server.vercel.app/task/${user?.email}`;
        fetch(url)
            .then((response) => response.json())
            .then((actualData) => {
                setTasks(actualData);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
            });
    }, [loading, user?.email]);
    return (
        <div className="flex">
            <div className={` ${open ? "w-52" : "w-24 "} bg-gradient-to-r from-[#5971DC] to-[#546EE5] min-h-screen p-5  pt-8 relative duration-300`}>
                <HiOutlineArrowLeftCircle className={`absolute cursor-pointer -right-3 top-9 text-3xl rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)} />
                <div className="flex gap-x-4 items-center">
                    <Link to='/'><h1
                        className={`normal-case flex gap-2 text-xl lg:text-3xl font-medium text-white duration-200 ${!open && "scale-0"}`}>
                        Taskia
                    </h1></Link>
                </div>
                <ul className="pt-6">
                    <li className="mt-3">
                        <NavLink to="/dashboard/userhome" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? ' flex items-center gap-2 bg-white bg-opacity-35 text-white rounded-sm px-4 py-1' : 'flex items-center gap-2 px-4 py-1 text-[#cedce4]'}>
                            <HiHome></HiHome>
                            <span className={`${!open && "hidden"} origin-left duration-200`}>Dashboard</span></NavLink>
                    </li>
                    <li className="mt-3">
                        <NavLink to="/dashboard/tasks" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? ' flex items-center gap-2 bg-white bg-opacity-35 text-white rounded-sm px-4 py-1' : 'flex items-center gap-2 px-4 py-1 text-[#cedce4]'}>
                            <HiListBullet></HiListBullet>
                            <span className={`${!open && "hidden"} origin-left duration-200`}>All Tasks</span></NavLink>
                    </li>
                    <li className="mt-3">
                        <NavLink to="/dashboard/mytasks" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? ' flex items-center gap-2 bg-white bg-opacity-35 text-white rounded-sm px-4 py-1' : 'flex items-center gap-2 px-4 py-1 text-[#cedce4]'}>
                            <HiListBullet></HiListBullet>
                            <span className={`${!open && "hidden"} origin-left duration-200`}>My Tasks</span></NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 bg-[#f5f5f5]">
                <div className="p-2 flex items-center gap-2 justify-end border-b">
                    <Link to='/dashboard/addTask' className="flex items-center bg-blue-500 px-2 py-1 rounded-md">
                        <HiMiniPlusCircle className="text-2xl text-white" />
                        <p className="text-white">Add Task</p>
                    </Link>
                    <div className="indicator m-2">
                        <span className="indicator-item badge badge-neutral -mt-2">{tasks.length}</span>
                        <FaBell className="text-blue-500 cursor-pointer"></FaBell>
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co/X2xMzwL/defultuser.png'} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><div>
                                <p>{user?.displayName ? user?.displayName : "User"}</p>
                            </div></li>
                            <li onClick={handleSignOut}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;