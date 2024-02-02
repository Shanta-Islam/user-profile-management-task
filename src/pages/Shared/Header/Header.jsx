
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";



const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success('Successfully Log Out');
            })
            .catch()
    }
    const links = <>
        <li><NavLink to="/" className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " hover:text-black focus:text-black text-black px-5 py-2 text-md rounded bg-transparent underline" : " "}>Home</NavLink></li>
        <li><NavLink to="/login" className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-black hover:text-black focus:text-black bg-transparent underline" : ""}>Login</NavLink></li>
        <li><NavLink to="/register" className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-black hover:text-black focus:text-black bg-transparent underline" : ""}>Register</NavLink></li>
    </>


    return (
        <div className="navbar fixed top-0 z-50 px-10 bg-white shadow-md xl:shadow-none">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn text-black btn-ghost xl:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <Link to='/'><a className="normal-case flex gap-2 text-xl lg:text-2xl font-medium text-black">Logo</a></Link>
            </div>
            <div className="navbar-end lg:flex items-center">
                {
                    user ?
                        <ul className="menu-horizontal px-3">
                            <li className="mx-3">
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
                                        <li><NavLink to='/profile'>Profile</NavLink></li>
                                        <li onClick={handleSignOut}><a>Logout</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        :
                        <ul className="menu menu-horizontal px-1 xl:flex hidden">
                            {links}
                        </ul>

                }
            </div>

        </div>
    );
};

export default Header;